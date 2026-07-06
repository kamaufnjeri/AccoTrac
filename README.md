# AccoTrac

> **Simplified double-entry accounting for small and medium-sized businesses.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0-green)](https://flask.palletsprojects.com)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org)

---

## Problem Statement

Small and medium-sized enterprises (SMEs) in emerging markets often rely on manual bookkeeping, spreadsheets or paper records that are error prone, hard to audit, and offer no real-time financial visibility. Enterprise accounting software is either too expensive or too complex for non-accountants.

## Solution

AccoTrac is a web-based accounting platform that brings proper **double-entry bookkeeping** to SMEs through a clean, approachable interface. Business owners can record transactions, track inventory, and generate financial statements without needing an accounting degree.

---

## Key Features

| Feature | Description |
|---|---|
| **Double-Entry Accounting** | Every transaction is recorded with balanced debit/credit journal entries |
| **Chart of Accounts** | Categorised accounts (assets, liabilities, revenue, expenses, capital) |
| **Profit & Loss Report** | Summarises revenues, expenses, and net income for any period |
| **Balance Sheet** | Snapshot of assets, liabilities, and equity |
| **Trial Balance** | Real-time check that books are balanced |
| **Inventory (Stock) Management** | Track stock items with FIFO-based cost-of-goods-sold calculation |
| **Multi-Company Support** | One user can manage multiple companies; role-based access (admin/member) |
| **Email Verification** | Account verification and password reset via email token |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Python 3, Flask 3, SQLAlchemy 2, Flask-Login, Flask-Mail, Alembic |
| **Frontend** | React 18, React Router 6, Axios, Bootstrap 5, MDB React UI Kit |
| **Database** | SQLite (development) / MySQL (production) |
| **Deployment** | cPanel + Phusion Passenger (backend), Static files (frontend) |

---

## Architecture Overview

AccoTrac uses a **REST API + Single Page Application** architecture. The React frontend communicates with the Flask backend over HTTP; the backend persists data via SQLAlchemy ORM.

- See [`system_overview`](docs/architecture/system_overview.md) for component diagrams.
- See [`database_schema`](docs/architecture/database_schema.md) for the full ERD.
- See [`application_flow`](docs/architecture/application_flow.md) for the user journey sequence diagram.

---

## Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+ / npm

### 1. Clone the repo
```bash
git clone https://github.com/kamaufnjeri/AccoTrac.git
cd AccoTrac
```

### 2. Start the backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in your values
flask db upgrade       # run migrations
flask run
```

### 3. Start the frontend
```bash
cd frontend/accotrac
npm install
npm start
```

- Full setup guide with environment variables: [`environment_variables`](docs/deployment/environment_variables.md)
- Deployment to cPanel: [`hosting`](docs/deployment/hosting.md)

---

## Documentation

| Doc | Description |
|---|---|
| [`architecture`](docs/architecture/) | System overview, application flow, database ERD |
| [`api_reference`](docs/api/api_reference.md) | Full REST API reference |
| [`deployment`](docs/deployment/) | Hosting, environment variables, CI/CD |
| [`security`](docs/security/) | Authentication, CORS, session management |
| [`scalability`](docs/scalability/) | Current constraints and growth path |
| [`lessons_learned`](docs/lessons_learned.md) | Technical retrospective |

---

## Authors

| Name | Role |
|---|---|
| Florence Kamau | Backend Developer |
| Joel Muhoho | Backend Developer |
| Olatunbosun Oladayo Michael | Frontend Developer |
| Innocent Akpoyibo | Frontend Developer |

---

## Contributing

Contributions are welcome! Please open an issue or pull request. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)
