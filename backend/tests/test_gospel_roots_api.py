"""Gospel Roots Lawn Care - Backend API tests (iteration 4)."""
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
    return r.json()["access_token"]


@pytest.fixture(scope="module")
def admin_session(admin_token):
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json", "Authorization": f"Bearer {admin_token}"})
    return s


# ===== Health =====
def test_root_health(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200
    assert "Gospel Roots" in r.json().get("message", "")


# ===== POST /api/quotes with new fields =====
def test_create_quote_with_new_fields(session):
    payload = {
        "name": "TEST_Iter4 Customer",
        "email": "test_iter4@example.com",
        "phone": "555-4040",
        "address": "777 Test Rd",
        "service": "All-in-One Yard Care",
        "preferred_date": "2026-02-15",
        "preferred_window": "Morning (8a - 12p)",
        "referral_source": "Google search",
        "message": "Iter4 e2e test — please ignore",
    }
    r = session.post(f"{API}/quotes", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["preferred_date"] == payload["preferred_date"]
    assert data["preferred_window"] == payload["preferred_window"]
    assert data["referral_source"] == payload["referral_source"]
    assert data["service"] == payload["service"]
    assert data["status"] == "new"
    assert data["notes"] is None
    assert data["follow_up_at"] is None
    assert "_id" not in data
    _created_quote_ids.append(data["id"])


def test_create_quote_invalid_email(session):
    r = session.post(f"{API}/quotes", json={
        "name": "TEST_Bad", "email": "not-an-email", "phone": "555-0000", "message": "x",
    })
    assert r.status_code == 422


# ===== Auth =====
def test_auth_login_success(session):
    r = session.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200
    assert r.json().get("user", {}).get("role") == "admin"


def test_auth_login_invalid(session):
    r = session.post(f"{API}/auth/login", json={
        "email": f"wrong_{int(time.time())}@example.com", "password": "nope",
    })
    assert r.status_code == 401


def test_auth_me_without_token():
    r = requests.get(f"{API}/auth/me")
    assert r.status_code == 401


# ===== GET /api/quotes includes new fields & status=new =====
def test_list_quotes_includes_new_fields(admin_session):
    r = admin_session.get(f"{API}/quotes")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list) and len(data) >= 1
    qid = _created_quote_ids[0]
    found = next((q for q in data if q["id"] == qid), None)
    assert found is not None
    assert found["preferred_date"] == "2026-02-15"
    assert found["preferred_window"] == "Morning (8a - 12p)"
    assert found["referral_source"] == "Google search"
    assert found["status"] == "new"
    assert "_id" not in found


def test_list_quotes_requires_auth():
    r = requests.get(f"{API}/quotes")
    assert r.status_code == 401


# ===== PATCH /api/quotes/{id} — status, notes, follow_up_at =====
def test_patch_requires_auth():
    r = requests.patch(f"{API}/quotes/anything", json={"status": "won"})
    assert r.status_code == 401


def test_patch_status_only(admin_session):
    qid = _created_quote_ids[0]
    r = admin_session.patch(f"{API}/quotes/{qid}", json={"status": "contacted"})
    assert r.status_code == 200, r.text
    assert r.json()["status"] == "contacted"
    # verify via GET
    rg = admin_session.get(f"{API}/quotes")
    found = next(q for q in rg.json() if q["id"] == qid)
    assert found["status"] == "contacted"


def test_patch_notes_only(admin_session):
    qid = _created_quote_ids[0]
    r = admin_session.patch(f"{API}/quotes/{qid}", json={"notes": "Called 1/30, left VM"})
    assert r.status_code == 200, r.text
    assert r.json()["notes"] == "Called 1/30, left VM"
    # status preserved
    assert r.json()["status"] == "contacted"


def test_patch_follow_up_at_only(admin_session):
    qid = _created_quote_ids[0]
    r = admin_session.patch(f"{API}/quotes/{qid}", json={"follow_up_at": "2026-02-05"})
    assert r.status_code == 200, r.text
    assert r.json()["follow_up_at"] == "2026-02-05"


def test_patch_combined_fields(admin_session):
    qid = _created_quote_ids[0]
    r = admin_session.patch(f"{API}/quotes/{qid}", json={
        "status": "quoted", "notes": "Quoted $30/visit weekly", "follow_up_at": "2026-02-10",
    })
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "quoted"
    assert body["notes"] == "Quoted $30/visit weekly"
    assert body["follow_up_at"] == "2026-02-10"


def test_patch_invalid_status_returns_422(admin_session):
    qid = _created_quote_ids[0]
    r = admin_session.patch(f"{API}/quotes/{qid}", json={"status": "invalid_status"})
    assert r.status_code == 422


def test_patch_empty_body_returns_400(admin_session):
    qid = _created_quote_ids[0]
    r = admin_session.patch(f"{API}/quotes/{qid}", json={})
    assert r.status_code == 400
    assert "No fields to update" in r.text


def test_patch_unknown_id_returns_404(admin_session):
    r = admin_session.patch(f"{API}/quotes/does-not-exist-iter4", json={"status": "won"})
    assert r.status_code == 404


# ===== Cleanup =====
def test_delete_cleanup(admin_session):
    assert _created_quote_ids
    for qid in list(_created_quote_ids):
        r = admin_session.delete(f"{API}/quotes/{qid}")
        assert r.status_code == 200
        _created_quote_ids.remove(qid)
