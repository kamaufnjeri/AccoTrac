# System Overview

AccoTrac follows a **REST API + Single Page Application** architecture with a clear separation between frontend, backend, and data layers.

---

## Component Diagram

```mermaid
graph TD
    subgraph Browser ["🌐 Browser (Client)"]
        React["React 18 SPA<br/>React Router / Axios"]
    end

    subgraph Backend ["🐍 Flask Backend (cPanel / Passenger)"]
        Blueprints["Flask Blueprints<br/>(user, account, transaction, report, stock)"]
        Controllers["Controllers<br/>(business logic)"]
        Models["SQLAlchemy Models<br/>(ORM)"]
        Auth["Flask-Login<br/>(session auth)"]
        Mail["Flask-Mail<br/>(SMTP)"]
    end

    subgraph Data ["🗄️ Data Layer"]
        DB[(SQLite / MySQL)]
    end

    subgraph External ["📧 External"]
        SMTP["SMTP Server<br/>(Outlook)"]
    end

    React -- "HTTP REST (JSON)<br/>via Axios + cookie session" --> Blueprints
    Blueprints --> Auth
    Blueprints --> Controllers
    Controllers --> Models
    Models --> DB
    Controllers --> Mail
    Mail --> SMTP
```

---

## Area Separation

| Area | Description | Authentication |
|---|---|---|
| **Public** | Landing page, About, Contact, Login, Signup | Not required |
| **User Area** | Dashboard, Accounts, Journal, Reports, Profile, Stock | Required (Flask-Login session) |

---

## Request Lifecycle

1. User action in React triggers an **Axios** HTTP request.
2. Flask receives the request, checks the **session cookie** via Flask-Login.
3. The appropriate **Blueprint route** delegates to a **Controller**.
4. The Controller queries/mutates data via **SQLAlchemy Models**.
5. A **JSON response** is returned to React.
6. React updates state and re-renders the UI.

---

## Key Design Decisions

| Decision | Rationale |
|---|---|
| Flask Blueprints | Modular routing — separates user, account, transaction, report concerns |
| SQLAlchemy ORM | Database-agnostic (SQLite for dev, MySQL for prod) |
| Server-side sessions | Simple to implement; Flask-Login handles session lifecycle |
| Async email sending | Email is dispatched in a background thread to avoid blocking HTTP responses |
| React SPA | Decoupled frontend — can be deployed independently as static files |

---

→ Back to [docs index](../README.md)
