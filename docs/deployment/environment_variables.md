# Environment Variables

All environment variables are loaded from a `.env` file using `python-dotenv`. **Never commit `.env` to version control.** Use `.env.example` as a template.

---

## Backend (`backend/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `SECRET_KEY` | ✅ **Yes** | Random (unsafe) | Flask session signing key. Must be a stable, secret string in production. A random fallback means all sessions are lost on every restart. |
| `DATABASE_URL` | ✅ Yes (prod) | `sqlite:///app.db` | Full SQLAlchemy database URI. Example: `mysql+pymysql://user:pass@localhost/accotrac` |
| `MAIL_SERVER` | ✅ Yes | — | SMTP server hostname. Example: `smtp.office365.com` |
| `MAIL_PORT` | ✅ Yes | `25` | SMTP port. Use `587` for TLS. |
| `MAIL_USE_TLS` | ✅ Yes | `false` | Set to any non-empty value to enable TLS. Example: `true` |
| `MAIL_USERNAME` | ✅ Yes | — | SMTP login username (usually your email address) |
| `MAIL_PASSWORD` | ✅ Yes | — | SMTP login password or app password |
| `ADMINS` | ✅ Yes | — | Sender email address for transactional emails. Example: `AccoTrac@outlook.com` |
| `ENVIRONMENT` | No | — | App environment flag. Example: `production` or `development` |

### `.env.example` (template)

```env
# Flask
SECRET_KEY=your-secret-key-here-change-this-in-production

# Database (leave empty to use SQLite for development)
DATABASE_URL=mysql+pymysql://db_user:db_password@localhost/accotrac_db

# Email (SMTP)
MAIL_SERVER=smtp.office365.com
MAIL_PORT=587
MAIL_USE_TLS=true
MAIL_USERNAME=your-email@outlook.com
MAIL_PASSWORD=your-email-password

# App config
ADMINS=AccoTrac@outlook.com
ENVIRONMENT=development
```

---

## Frontend (`frontend/accotrac/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `REACT_APP_API_URL` | No | Uses proxy (`localhost:5000`) | Base URL of the Flask API. Set this explicitly for production builds. |

### `.env.example` (template)

```env
# API base URL (only needed for production builds)
REACT_APP_API_URL=https://yourdomain.com
```

---

## Generating a Secure `SECRET_KEY`

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

---

## Notes

> [!WARNING]
> Do **not** rely on the `SECRET_KEY` fallback (`os.urandom(24).hex()` in `config.py`). A new key is generated on every restart, which invalidates all user sessions. Always set a stable `SECRET_KEY` in production.

> [!NOTE]
> `MAIL_USE_TLS` is evaluated as `os.getenv('MAIL_USE_TLS') is not None` — meaning **any non-empty value** (including `"false"`) enables TLS. Set `MAIL_USE_TLS=true` and leave it unset if you don't want TLS.

---

→ Back to [docs index](../README.md)
