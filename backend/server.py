from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import logging
import uuid
import asyncio
from datetime import datetime, timezone, timedelta
from typing import List, Optional

import bcrypt
import jwt
import resend
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends, status
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr


# ===== Setup =====
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Gospel Roots Lawn Care API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)

JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_TTL_MIN = 60 * 12  # 12 hours
REFRESH_TOKEN_TTL_DAYS = 7
LOCKOUT_THRESHOLD = 5
LOCKOUT_MINUTES = 15

resend.api_key = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
NOTIFICATION_RECIPIENT_EMAIL = os.environ.get(
    "NOTIFICATION_RECIPIENT_EMAIL", os.environ.get("ADMIN_EMAIL", "")
)


# ===== Helpers =====
def jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_TTL_MIN),
    }
    return jwt.encode(payload, jwt_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "type": "refresh",
        "exp": datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_TTL_DAYS),
    }
    return jwt.encode(payload, jwt_secret(), algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, access: str, refresh: str) -> None:
    response.set_cookie(
        "access_token", access, httponly=True, secure=True, samesite="none",
        max_age=ACCESS_TOKEN_TTL_MIN * 60, path="/",
    )
    response.set_cookie(
        "refresh_token", refresh, httponly=True, secure=True, samesite="none",
        max_age=REFRESH_TOKEN_TTL_DAYS * 86400, path="/",
    )


def clear_auth_cookies(response: Response) -> None:
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")


async def get_current_user(request: Request) -> dict:
    auth_header = request.headers.get("Authorization", "")
    token = auth_header[7:] if auth_header.startswith("Bearer ") else None
    if not token:
        token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def require_admin(user: dict = Depends(get_current_user)) -> dict:
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


# ===== Models =====
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class QuoteRequestCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=4, max_length=40)
    address: Optional[str] = Field(default=None, max_length=240)
    service: Optional[str] = Field(default=None, max_length=80)
    message: str = Field(..., min_length=1, max_length=2000)


class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    address: Optional[str] = None
    service: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LoginPayload(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserOut"


class UserOut(BaseModel):
    id: str
    email: str
    name: str
    role: str


# ===== Email notification =====
def _build_quote_html(q: QuoteRequest) -> str:
    rows = [
        ("Name", q.name),
        ("Email", q.email),
        ("Phone", q.phone),
        ("Address", q.address or "—"),
        ("Service", q.service or "Not specified"),
        ("Submitted", q.created_at.strftime("%b %d, %Y at %I:%M %p UTC")),
    ]
    rows_html = "".join(
        f"""<tr>
            <td style="padding:8px 14px;color:#4A5568;font-size:13px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #eee;">{k}</td>
            <td style="padding:8px 14px;color:#1B4332;font-size:15px;font-weight:600;border-bottom:1px solid #eee;">{v}</td>
        </tr>"""
        for k, v in rows
    )
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F8F6;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e6e6e6;">
          <tr><td style="background:#1B4332;color:#ffffff;padding:24px 28px;">
            <div style="font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#cbe2d0;">Gospel Roots Lawn Care</div>
            <div style="font-size:24px;font-family:Georgia,serif;margin-top:6px;">New Quote Request</div>
          </td></tr>
          <tr><td style="padding:20px 28px 4px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">{rows_html}</table>
          </td></tr>
          <tr><td style="padding:20px 28px 28px 28px;">
            <div style="font-size:13px;color:#4A5568;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Message</div>
            <div style="font-size:15px;color:#1B4332;line-height:1.55;background:#F9F8F6;border-radius:10px;padding:14px 16px;">{q.message.replace(chr(10), "<br>")}</div>
          </td></tr>
          <tr><td style="background:#F9F8F6;padding:18px 28px;color:#4A5568;font-size:12px;text-align:center;">
            Sent automatically from your website · Reply directly to <a href="mailto:{q.email}" style="color:#1B4332;">{q.email}</a> to respond.
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def send_quote_notification(q: QuoteRequest) -> None:
    if not resend.api_key or not NOTIFICATION_RECIPIENT_EMAIL:
        logger.info("Resend not configured; skipping notification email.")
        return
    params = {
        "from": f"Gospel Roots Lawn Care <{SENDER_EMAIL}>",
        "to": [NOTIFICATION_RECIPIENT_EMAIL],
        "reply_to": [q.email],
        "subject": f"New Quote Request — {q.name}",
        "html": _build_quote_html(q),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Quote notification sent: %s", result.get("id") if isinstance(result, dict) else result)
    except Exception as e:  # noqa: BLE001
        logger.error("Failed to send quote notification email: %s", e)


# ===== Routes =====
@api_router.get("/")
async def root():
    return {"message": "Gospel Roots Lawn Care API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(payload: StatusCheckCreate):
    obj = StatusCheck(**payload.model_dump())
    doc = obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get("timestamp"), str):
            r["timestamp"] = datetime.fromisoformat(r["timestamp"])
    return rows


@api_router.post("/quotes", response_model=QuoteRequest, status_code=201)
async def create_quote(payload: QuoteRequestCreate):
    obj = QuoteRequest(**payload.model_dump())
    doc = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.quote_requests.insert_one(doc)
    except Exception as e:
        logger.exception("Failed to save quote request")
        raise HTTPException(status_code=500, detail="Could not save quote request") from e

    # Fire-and-forget email notification
    asyncio.create_task(send_quote_notification(obj))
    return obj


@api_router.get("/quotes", response_model=List[QuoteRequest])
async def list_quotes(_: dict = Depends(require_admin)):
    rows = await db.quote_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for r in rows:
        if isinstance(r.get("created_at"), str):
            r["created_at"] = datetime.fromisoformat(r["created_at"])
    return rows


@api_router.delete("/quotes/{quote_id}")
async def delete_quote(quote_id: str, _: dict = Depends(require_admin)):
    res = await db.quote_requests.delete_one({"id": quote_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Quote not found")
    return {"deleted": quote_id}


# ----- Auth routes -----
@api_router.post("/auth/login", response_model=TokenResponse)
async def login(payload: LoginPayload, request: Request):
    email = payload.email.lower().strip()
    ip = request.client.host if request.client else "unknown"
    lock_key = f"{ip}:{email}"

    attempt = await db.login_attempts.find_one({"identifier": lock_key})
    if attempt and attempt.get("count", 0) >= LOCKOUT_THRESHOLD:
        last_at = attempt.get("last_at")
        if isinstance(last_at, str):
            last_at = datetime.fromisoformat(last_at)
        if last_at and datetime.now(timezone.utc) - last_at < timedelta(minutes=LOCKOUT_MINUTES):
            raise HTTPException(status_code=429, detail="Too many attempts. Try again later.")

    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": lock_key},
            {"$inc": {"count": 1}, "$set": {"last_at": datetime.now(timezone.utc).isoformat()}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await db.login_attempts.delete_one({"identifier": lock_key})
    access = create_access_token(user["id"], user["email"])
    user_out = UserOut(id=user["id"], email=user["email"], name=user.get("name", "Admin"), role=user["role"])
    return TokenResponse(access_token=access, user=user_out)


@api_router.post("/auth/logout")
async def logout(_: dict = Depends(get_current_user)):
    # Token-based auth: client clears its own token. Endpoint stays for symmetry.
    return {"ok": True}


@api_router.get("/auth/me", response_model=UserOut)
async def me(user: dict = Depends(get_current_user)):
    return UserOut(id=user["id"], email=user["email"], name=user.get("name", "Admin"), role=user["role"])


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ===== Startup: seed admin & indexes =====
@app.on_event("startup")
async def on_startup():
    try:
        await db.quote_requests.create_index("created_at")
        await db.users.create_index("email", unique=True)
        await db.login_attempts.create_index("identifier")
    except Exception as e:
        logger.warning("Index creation skipped: %s", e)

    admin_email = os.environ.get("ADMIN_EMAIL", "").lower().strip()
    admin_password = os.environ.get("ADMIN_PASSWORD", "")
    if not admin_email or not admin_password:
        logger.warning("ADMIN_EMAIL/ADMIN_PASSWORD not set; admin not seeded.")
        return

    existing = await db.users.find_one({"email": admin_email})
    if not existing:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Gospel Roots Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Seeded admin user: %s", admin_email)
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}},
        )
        logger.info("Admin password updated for: %s", admin_email)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
