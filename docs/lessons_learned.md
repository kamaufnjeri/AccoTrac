# Lessons Learned

A retrospective on the technical decisions, challenges, and things we'd do differently on AccoTrac.

---

## What We Built

AccoTrac is a full-stack web application implementing double-entry bookkeeping for SMEs. The core technical achievements were:

- A correct implementation of double-entry accounting with balanced journal entries.
- FIFO inventory cost-of-goods-sold calculation.
- Multi-tenant data isolation via a many-to-many user-company association model.
- Async email sending for non-blocking user registration and password reset flows.
- A decoupled REST API + React SPA architecture deployable to a shared hosting environment.

---

## What Worked Well

### Double-Entry Accounting Logic
Implementing the accounting engine was the most rewarding challenge. The insight that every transaction requires debits to equal credits — and that account *balance direction* differs by category (assets/expenses are debit-normal; liabilities/revenue/capital are credit-normal) — led to a clean, self-validating data model.

The `Account.to_dict()` balance calculation:
```python
if self.category in ("asset", "expense"):
    balance = self.debit_total - self.credit_total
else:
    balance = self.credit_total - self.debit_total
```
This single formula correctly computes the natural balance for any account type.

### Multi-Tenancy via Association Model
Using an explicit `UserCompanyAssociation` table (rather than a simple foreign key) gave us flexibility to:
- Support many-to-many (a user in multiple companies).
- Attach role information (`is_admin`) to the relationship.
- Cleanly cascade deletes.

This was a good design call that paid off as the feature set expanded.

### Async Email
Using Python's `threading.Thread` to send emails asynchronously kept HTTP response times fast without introducing a heavy task queue dependency. For the current scale, this was the right trade-off.

---

## What Was Challenging

### CORS Configuration in SPA + API Setup
Getting CORS right for a session-cookie-based SPA was non-trivial. The key insight: `supports_credentials=True` requires **explicit origins** (no wildcard `*`). Hardcoding `localhost:3000` worked for development but is a recurring friction point for deployment.

**Lesson:** Externalise CORS origins to an environment variable from the start.

### `SECRET_KEY` and Session Stability
The fallback to a randomly-generated `SECRET_KEY` in `config.py` caused confusing "session lost" bugs during development (any restart invalidated sessions). This was traced back late.

**Lesson:** Fail fast — raise an error if `SECRET_KEY` is not set, rather than silently using a random value.

### SQLite Concurrency in Development
SQLite's write locking caused intermittent errors during concurrent test runs. Switching to a proper database earlier would have saved debugging time.

**Lesson:** Use MySQL/PostgreSQL even in development to avoid environment-specific bugs.

### Monorepo Without Shared Tooling
The project has three separate directories (`backend/`, `frontend/`, `accotracServer/`) with no shared tooling (no pre-commit hooks, no shared linting config). Code consistency suffered.

**Lesson:** Set up linting, formatting, and pre-commit hooks at project inception.

---

## What We'd Do Differently

| Decision | What Happened | What We'd Do Now |
|---|---|---|
| Auth mechanism | Flask-Login session cookies | JWT tokens — stateless, easier to scale |
| CORS config | Hardcoded origins | Env var from day one |
| `SECRET_KEY` fallback | Silent random fallback | Raise `ValueError` if not set |
| Database in dev | SQLite | Use MySQL from the start |
| API validation | Manual field checking | Use Marshmallow schemas |
| Frontend README | Left as CRA boilerplate | Replace immediately |
| No `.env.example` | Env vars undocumented | Commit `.env.example` from day one |
| No CI/CD | Manual FTP deploys | GitHub Actions from the first PR |
| No tests | No test suite | TDD or at least integration tests for core accounting logic |

---

## Accounting Insights

Building AccoTrac taught us that accounting software is fundamentally a **consistency problem**:

- The ledger must always balance (debits = credits across all entries).
- Historical transactions should be **immutable** — if a mistake is made, record a correcting entry, don't edit the original.
- FIFO costing requires careful state management — remaining quantities must be updated atomically with the sales transaction.

These constraints pushed us toward more careful transaction handling in SQLAlchemy (using `db.session.rollback()` on failure) and more thorough input validation.

---

→ Back to [docs index](../README.md)
