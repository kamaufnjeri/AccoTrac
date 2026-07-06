# Hosting Platform

---

## Backend

| Setting | Value |
|---|---|
| Platform | cPanel Shared Hosting |
| Server | Apache + Phusion Passenger |
| Language | Python 3.10+ |
| WSGI Entry Point | `passenger_wsgi.py` (in `accotracServer/`) |
| Process Manager | Phusion Passenger (handles process lifecycle) |
| Database | MySQL (via `DATABASE_URL` env var) |
| Email | SMTP via Flask-Mail (Outlook sender) |

### How Phusion Passenger Works

Passenger is a production-grade application server integrated with Apache on cPanel. It:
- Reads `passenger_wsgi.py` to discover the WSGI application object
- Manages worker processes (starts, restarts, scales)
- Handles connections from Apache

**To restart the app** after code changes:
```bash
touch tmp/restart.txt
```
Passenger detects this file and triggers a graceful restart of the Flask process.

### `passenger_wsgi.py` Pattern

```python
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(__file__))

# Import the Flask app as 'application' — required by Passenger
from app import app as application
```

---

## Frontend

| Setting | Value |
|---|---|
| Serving | Apache static file serving |
| Build Tool | Create React App (`npm run build`) |
| Output | `/build` directory (minified JS/CSS/HTML) |
| Location on Server | Uploaded to `public_html/` via FTP or cPanel File Manager |

The React app is a **static SPA** — no server-side rendering. Apache serves the `index.html` and all assets directly.

### Handling Client-Side Routing

React Router uses client-side routing. Without server configuration, refreshing a deep URL (e.g., `/dashboard`) returns a 404 from Apache. Add an `.htaccess` to `public_html/`:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

---

## Development vs Production

| Aspect | Development | Production |
|---|---|---|
| Backend server | Flask dev server (`flask run`) | Phusion Passenger via cPanel |
| Database | SQLite (`app.db`) | MySQL (via `DATABASE_URL`) |
| Frontend server | CRA dev server (`npm start`) | Apache static files |
| CORS origins | `localhost:3000` | Your production domain |
| Debug mode | `debug=True` | **Must be `False`** |

---

→ See [`environment_variables.md`](environment_variables.md) for all required env vars.  
→ See [`deployment_architecture.md`](deployment_architecture.md) for the architecture diagram.  
→ Back to [docs index](../README.md)
