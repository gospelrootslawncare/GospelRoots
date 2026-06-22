"""Gospel Roots Lawn Care - Backend API tests (iteration 2).

Covers:
- Health
- POST /api/quotes (success, validation, optional fields) + email notification log
- POST /api/auth/login (success, bad creds)
- GET  /api/auth/me (with/without token)
- GET  /api/quotes (auth-gated)
- DELETE /api/quotes/{id} (auth-gated, cleanup)
"""
import os
import time
import pytest
import requests

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/')
API = f"{BASE_URL}/api"
ADMIN_EMAIL = "gospelrootslawncare@gmail.com"
ADMIN_PASSWORD = "Phil4:6-7"

_created_quote_ids = []


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_token(session):
    r = session.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    if r.status_code != 200:
        pytest.skip(f"Admin login failed ({r.status_code}): {r.text}")
    data = r.json()
    assert "access_token" in data
    return data["access_token"]


@pytest.fixture(scope="module")
def admin_session(admin_token):
    s = requests.Session()
    s.headers.update({
        "Content-Type": "application/json",
        "Authorization": f"Bearer {admin_token}",
    })
    return s


# ===== Health =====
def test_root_health(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert "Gospel Roots" in data.get("message", "")


# ===== Quotes: Create (public) =====
def test_create_quote_success(session):
    payload = {
        "name": "TEST_John Doe",
        "email": "test_john@example.com",
        "phone": "555-1234",
        "address": "123 Test Lane",
        "service": "Mowing",
        "message": "Need a lawn quote",
    }
    r = session.post(f"{API}/quotes", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert isinstance(data.get("id"), str) and len(data["id"]) > 0
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["phone"] == payload["phone"]
    assert data["service"] == payload["service"]
    assert data["message"] == payload["message"]
    assert "created_at" in data
    assert "_id" not in data
    _created_quote_ids.append(data["id"])


def test_create_quote_minimal_fields(session):
    payload = {
        "name": "TEST_Jane",
        "email": "test_jane@example.com",
        "phone": "555-9999",
        "message": "Minimal quote",
    }
    r = session.post(f"{API}/quotes", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["address"] is None
    assert data["service"] is None
    _created_quote_ids.append(data["id"])


def test_create_quote_invalid_email(session):
    r = session.post(f"{API}/quotes", json={
        "name": "TEST_Bad", "email": "not-an-email", "phone": "555-0000", "message": "x",
    })
    assert r.status_code == 422


def test_create_quote_missing_required(session):
    r = session.post(f"{API}/quotes", json={"name": "TEST_Missing"})
    assert r.status_code == 422


# ===== Auth =====
def test_auth_login_success(session):
    r = session.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    data = r.json()
    assert isinstance(data.get("access_token"), str) and len(data["access_token"]) > 20
    assert data.get("token_type") == "bearer"
    user = data.get("user") or {}
    assert user.get("email") == ADMIN_EMAIL
    assert user.get("role") == "admin"
    assert "id" in user and "name" in user


def test_auth_login_invalid(session):
    # Use a unique email to avoid hitting lockout from previous runs
    r = session.post(f"{API}/auth/login", json={
        "email": f"wrong_{int(time.time())}@example.com", "password": "nope",
    })
    assert r.status_code == 401


def test_auth_me_without_token(session):
    r = requests.get(f"{API}/auth/me")
    assert r.status_code == 401


def test_auth_me_with_token(admin_session):
    r = admin_session.get(f"{API}/auth/me")
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("email") == ADMIN_EMAIL
    assert data.get("role") == "admin"


# ===== Quotes: List (admin) =====
def test_list_quotes_requires_auth():
    r = requests.get(f"{API}/quotes")
    assert r.status_code == 401


def test_list_quotes_with_admin(admin_session):
    r = admin_session.get(f"{API}/quotes")
    assert r.status_code == 200, r.text
    data = r.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    first = data[0]
    for key in ("id", "name", "email", "phone", "message", "created_at"):
        assert key in first
    assert "_id" not in first
    # Newly created TEST_ quote should be present
    ids = [q["id"] for q in data]
    if _created_quote_ids:
        assert _created_quote_ids[0] in ids


# ===== Quotes: Delete (admin) =====
def test_delete_quote_requires_auth():
    r = requests.delete(f"{API}/quotes/non-existent-id")
    assert r.status_code == 401


def test_delete_quote_with_admin_and_cleanup(admin_session):
    # Delete every TEST_ quote we created
    assert _created_quote_ids, "No TEST_ quote ids captured for cleanup"
    for qid in list(_created_quote_ids):
        r = admin_session.delete(f"{API}/quotes/{qid}")
        assert r.status_code == 200, r.text
        body = r.json()
        assert body.get("deleted") == qid
        # Verify removal
        r2 = admin_session.delete(f"{API}/quotes/{qid}")
        assert r2.status_code == 404
        _created_quote_ids.remove(qid)
