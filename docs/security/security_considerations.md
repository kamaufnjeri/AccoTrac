# Security Considerations

This document covers the security measures in place in AccoTrac and known issues that should be addressed before scaling to a larger user base.

---

## Authentication

### Mechanism
AccoTrac uses **Flask-Login** for session-based authentication. On successful login:
1. `login_user(user)` is called.
2. Flask sets a **signed, encrypted session cookie** (signed with `SECRET_KEY`).
3. Subsequent requests carry this cookie; Flask-Login reads it and populates `current_user`.

### Protected Routes
Routes requiring authentication are decorated with `@login_required`. Unauthenticated requests receive a `401 Unauthorized` response (custom handler in `app/__init__.py`).

---

## Password Security

| Aspect | Implementation |
|---|---|
| Hashing algorithm | Werkzeug `generate_password_hash` (uses PBKDF2-HMAC-SHA256 with salt) |
| Verification | `check_password_hash` — constant-time comparison |
| Storage | Only the hash is stored; plain-text password is never persisted |

---

## Email Token Security

Email verification and password reset tokens are **signed JWTs** (via the `utils/apputils.py` token utilities). Tokens:
- Contain the user email or user identifier.
- Are signed with the application's `SECRET_KEY`.
- Should have a short expiry (verify that expiry is enforced in `get_data_from_token`).

---

## CORS (Cross-Origin Resource Sharing)

**Current state:**
```python
# backend/app/__init__.py
cors = CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost"]}}, supports_credentials=True)
```

**Issues:**
- Origins are **hardcoded**. In production, this should be your actual domain.
- `supports_credentials=True` allows cookies to be sent cross-origin, which is necessary for session auth — but requires origins to be explicit (no wildcard `*`).

**Recommended fix:**
```python
import os
CORS(
    app,
    resources={r"/*": {"origins": os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")}},
    supports_credentials=True
)
```

And in `.env`:
```env
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

---

## `SECRET_KEY` Management

> [!CAUTION]
> The current `config.py` has a dangerous fallback:
> ```python
> random_key = os.urandom(24).hex()
> SECRET_KEY = os.environ.get('SECRET_KEY') or random_key
> ```
> If `SECRET_KEY` is not set, a new random key is generated **on every app restart**, immediately invalidating all active sessions. This is a poor user experience and a latent operational risk.

**Fix:** Always set `SECRET_KEY` in your `.env` file. Generate one with:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

---

## HTTPS

- In production on cPanel, ensure HTTPS is enforced via cPanel's **SSL/TLS** settings (Let's Encrypt is available for free).
- Add `SESSION_COOKIE_SECURE = True` to `Config` to ensure session cookies are only sent over HTTPS.
- Add `SESSION_COOKIE_HTTPONLY = True` (Flask default) to prevent JavaScript access to session cookies.

**Recommended additions to `config.py`:**
```python
SESSION_COOKIE_SECURE = os.getenv('ENVIRONMENT') == 'production'
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
```

---

## Input Validation

- The backend validates required fields for all POST/PUT requests and returns `400` for missing data.
- SQLAlchemy parameterised queries protect against SQL injection.
- No free-text HTML input is accepted, reducing XSS risk.

> [!NOTE]
> Consider adding a validation library like **Marshmallow** or **Pydantic** to centralise and strengthen request validation.

---

## Known Issues Summary

| Issue | Severity | Status |
|---|---|---|
| `SECRET_KEY` falls back to random value | 🔴 High | Not fixed — set `SECRET_KEY` in `.env` |
| CORS origins hardcoded to `localhost` | 🟠 Medium | Not fixed — use env var |
| No HTTPS enforcement in config | 🟠 Medium | Enforce via cPanel + add `SESSION_COOKIE_SECURE` |
| Token expiry enforcement unclear | 🟡 Low | Verify in `utils/apputils.py` |
| No rate limiting on login/forgot-password | 🟡 Low | Consider adding `flask-limiter` |

---

→ Back to [docs index](../README.md)
