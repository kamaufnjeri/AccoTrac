# Application Flow

This document describes the key user journeys in AccoTrac and illustrates them with sequence diagrams.

---

## 1. User Registration & Email Verification

```mermaid
sequenceDiagram
    actor User
    participant React as React Frontend
    participant Flask as Flask API
    participant DB as Database
    participant Mail as SMTP (Email)

    User->>React: Fill signup form (name, email, password, company)
    React->>Flask: POST /user
    Flask->>DB: Check if email already exists
    DB-->>Flask: Not found
    Flask->>DB: Create User + Company + UserCompanyAssociation (is_admin=true)
    Flask->>Flask: Generate signed email verification token
    Flask->>Mail: Send verification email with token link
    Flask-->>React: 201 Created — "Check your email"
    React-->>User: Show success toast

    User->>React: Click link in email
    React->>Flask: GET /user/verifyemail/{token}
    Flask->>Flask: Decode and validate token
    Flask->>DB: Set user.valid_email = true
    Flask-->>React: 200 OK — user object
    React-->>User: Show "Email verified" message
```

---

## 2. Login Flow

```mermaid
sequenceDiagram
    actor User
    participant React as React Frontend
    participant Flask as Flask API
    participant DB as Database

    User->>React: Enter email and password
    React->>Flask: POST /login (JSON body)
    Flask->>DB: Fetch user by email
    DB-->>Flask: User record
    Flask->>Flask: Verify password hash (Werkzeug)
    Flask->>Flask: login_user() — create session cookie
    Flask-->>React: 200 OK — user object + is_authenticated: true
    React->>React: Store auth state
    React-->>User: Redirect to Dashboard
```

---

## 3. Recording a Transaction (e.g., a Sale)

```mermaid
sequenceDiagram
    actor User
    participant React as React Frontend
    participant Flask as Flask API
    participant DB as Database

    User->>React: Fill "Add Sale" form (date, description, accounts, stock items)
    React->>Flask: POST /api/addsales (with session cookie)
    Flask->>Flask: @login_required — validate session
    Flask->>Flask: Validate request body fields
    Flask->>DB: Create Transaction record
    Flask->>DB: Create JournalEntry records (debit/credit pairs)
    Flask->>DB: Update Account.debit_total / credit_total
    Flask->>DB: Create StockEntry records (FIFO COGS calculation)
    Flask->>DB: Update Stock.total_quantity
    DB-->>Flask: Success
    Flask-->>React: 201 Created — confirmation
    React-->>User: Show success notification
```

---

## 4. Generating a Report (e.g., Profit & Loss)

```mermaid
sequenceDiagram
    actor User
    participant React as React Frontend
    participant Flask as Flask API
    participant DB as Database

    User->>React: Select date range, click "Generate Report"
    React->>Flask: GET /report/profitloss?start=...&end=... (with session cookie)
    Flask->>Flask: @login_required — validate session
    Flask->>DB: Query Accounts by company_id filtered by category (revenue, expense)
    Flask->>DB: Query JournalEntries within date range
    Flask->>Flask: Aggregate totals — compute net income
    Flask-->>React: 200 OK — structured report JSON
    React-->>User: Render Profit & Loss table
```

---

## 5. Password Reset Flow

```mermaid
sequenceDiagram
    actor User
    participant React as React Frontend
    participant Flask as Flask API
    participant DB as Database
    participant Mail as SMTP (Email)

    User->>React: Enter email on "Forgot Password" page
    React->>Flask: POST /forgotpassword
    Flask->>DB: Verify user exists
    Flask->>Flask: Generate signed reset token (contains user_email)
    Flask->>Mail: Send reset link with token
    Flask-->>React: 200 OK — "Check your email"

    User->>React: Click reset link, enter new password
    React->>Flask: PUT /resetpassword/{token}
    Flask->>Flask: Decode and validate token
    Flask->>Flask: Verify passwords match
    Flask->>DB: Update user.password_hash
    Flask-->>React: 200 OK — "Password updated"
    React-->>User: Redirect to Login
```

---

→ Back to [docs index](../README.md)
