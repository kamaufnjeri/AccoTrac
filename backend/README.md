# AccoTrac - Backend

Flask REST API powering the AccoTrac accounting platform.

---

## Tech Stack

| Component | Technology |
|---|---|
| Language | Python 3.10+ |
| Framework | Flask 3.0 |
| ORM | SQLAlchemy 2.0 |
| Migrations | Alembic via Flask-Migrate |
| Auth | Flask-Login (server-side sessions) |
| Email | Flask-Mail (SMTP) |
| Password Hashing | Werkzeug `generate_password_hash` |

---

## Project Structure

```
backend/
├── app/
│   ├── __init__.py         # App factory — Flask, DB, CORS, mail, blueprints
│   ├── models/             # SQLAlchemy ORM models
│   │   ├── user.py
│   │   ├── company.py
│   │   ├── user_company.py # Many-to-many association with role
│   │   ├── account.py
│   │   ├── transaction.py
│   │   ├── journal_entries.py
│   │   ├── stock.py
│   │   └── stock_entries.py
│   ├── routes/             # Flask blueprints / route definitions
│   │   ├── user_routes.py
│   │   ├── account_routes.py
│   │   ├── transaction_routes.py
│   │   ├── report_routes.py
│   │   └── backend_only_routes.py
│   ├── controllers/        # Business logic
│   └── utils/              # Helpers (token creation, user/company utils)
├── config.py               # Config class (reads from .env)
├── app.py                  # Entry point (dev server)
├── requirements.txt
└── .env.example            # Template for required env vars
```

---

## Setup

### 1. Create and activate virtual environment
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure environment
```bash
cp .env.example .env
# Edit .env with your values (see docs/deployment/environment_variables.md)
```

### 4. Run database migrations
```bash
flask db upgrade
```

### 5. Start the development server
```bash
flask run
# API available at http://localhost:5000
```

---

## Environment Variables

See [`docs/deployment/environment_variables.md`](../docs/deployment/environment_variables.md) for the full reference.

Key variables:
- `SECRET_KEY` — **Must be set** to a stable random string in production (a missing/dynamic key invalidates sessions on restart)
- `DATABASE_URL` — Defaults to SQLite (`app.db`) if not set; use a MySQL URL for production
- `ADMINS` — Email address used as the sender for transactional emails

---

## API Reference

→ [`docs/api/api_reference.md`](../docs/api/api_reference.md)

---

## Deployment

→ [`docs/deployment/hosting.md`](../docs/deployment/hosting.md)

---

## Known Issues & Notes

- **CORS origins** are currently hardcoded to `localhost:3000` in `app/__init__.py`. For production, these should be loaded from the `CORS_ORIGINS` environment variable.
- **`SECRET_KEY` fallback**: If `SECRET_KEY` is not set in `.env`, a new random key is generated on every restart — invalidating all active sessions.

→ See [`docs/security/security_considerations.md`](../docs/security/security_considerations.md) for details.
