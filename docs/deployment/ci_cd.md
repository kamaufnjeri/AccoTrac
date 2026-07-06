# CI/CD Pipeline


## Current State

AccoTrac currently has **no automated CI/CD pipeline**. Deployments are manual:

1. Developer pushes code to GitHub.
2. Server is updated via SSH + `git pull`.
3. Backend is restarted with `touch tmp/restart.txt` (Passenger).
4. Frontend build is manually uploaded via FTP or cPanel File Manager.

This process is functional but error-prone and slow, especially when multiple contributors are involved.

---

## To Be Implemented Pipeline (GitHub Actions)

The following is a recommended CI/CD setup using **GitHub Actions** for automated testing on pull requests and optional automated deployment.

### To Be Implemented Workflow Structure

```
.github/
└── workflows/
    ├── backend_ci.yml    ← Run on every PR: lint + test Flask API
    ├── frontend_ci.yml   ← Run on every PR: lint + build React app
    └── deploy.yml        ← Run on push to main: deploy to cPanel
```


### cPanel Deploy via Git (Alternative to Manual FTP)

cPanel supports **Git Version Control** — you can configure it to auto-pull from a GitHub repository on push. This eliminates the SSH step:

1. In cPanel → **Git Version Control** → clone your repo.
2. Enable **Auto Deploy** for the `main` branch.
3. Create a `.cpanel.yml` deployment script:

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/youraccount/accotracServer
    - /bin/cp -r $DEPLOYPATH/. $DEPLOYPATH/backup/
    - cd $DEPLOYPATH && source venv/bin/activate && pip install -r requirements.txt
    - cd $DEPLOYPATH && flask db upgrade
    - touch $DEPLOYPATH/tmp/restart.txt
```

---

## Summary: Current vs Recommended

| Aspect | Current | Recommended |
|---|---|---|
| Code review | Manual | GitHub PR with CI status check |
| Backend testing | None | `pytest` on every PR |
| Linting | None | `flake8` (backend), ESLint (frontend) |
| Deployment trigger | Manual SSH + FTP | cPanel Git Auto-Deploy or GitHub Actions |
| Rollback | Manual `git checkout` | Git history + backup in `.cpanel.yml` |

---

→ Back to [docs index](../README.md)
