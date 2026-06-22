"""Gospel Roots Lawn Care - Backend API tests."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://gospel-lawn-pro.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ===== Health =====
def test_root_health(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
    assert "Gospel Roots" in data["message"]


# ===== Quotes: Create =====
def test_create_quote_success(session):
    payload = {
        "name": "TEST_John Doe",
        "email": "test_john@example.com",
        "phone": "555-1234",
        "address": "123 Test Lane",
        "service": "Mowing",
        "message": "Need a lawn quote"
    }
    r = session.post(f"{API}/quotes", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["phone"] == payload["phone"]
    assert data["address"] == payload["address"]
    assert data["service"] == payload["service"]
    assert data["message"] == payload["message"]
    assert "created_at" in data
    pytest.created_quote_id = data["id"]


def test_create_quote_minimal_fields(session):
    """address and service optional."""
    payload = {
        "name": "TEST_Jane",
        "email": "test_jane@example.com",
        "phone": "555-9999",
        "message": "Minimal quote"
    }
    r = session.post(f"{API}/quotes", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["address"] is None
    assert data["service"] is None
    assert data["name"] == "TEST_Jane"


def test_create_quote_invalid_email(session):
    payload = {
        "name": "TEST_Bad",
        "email": "not-an-email",
        "phone": "555-0000",
        "message": "Invalid email test"
    }
    r = session.post(f"{API}/quotes", json=payload)
    assert r.status_code == 422


def test_create_quote_missing_required(session):
    # missing email, phone, message
    r = session.post(f"{API}/quotes", json={"name": "TEST_Missing"})
    assert r.status_code == 422


def test_create_quote_missing_message(session):
    r = session.post(f"{API}/quotes", json={
        "name": "TEST_NoMsg",
        "email": "nomsg@example.com",
        "phone": "555-1111"
    })
    assert r.status_code == 422


# ===== Quotes: List =====
def test_list_quotes_contains_created(session):
    r = session.get(f"{API}/quotes")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    created_id = getattr(pytest, "created_quote_id", None)
    if created_id:
        ids = [q["id"] for q in data]
        assert created_id in ids
    # Validate structure
    first = data[0]
    for key in ("id", "name", "email", "phone", "message", "created_at"):
        assert key in first
    # No leaking mongo _id
    assert "_id" not in first
