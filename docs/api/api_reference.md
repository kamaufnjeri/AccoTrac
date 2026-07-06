# API Reference

All endpoints return JSON. Authentication is via Flask-Login session cookie. Protected routes require a valid session (set by `POST /login`).

**Base URL (development):** `http://localhost:5000`

---

## Authentication & Users

### `POST /user` — Register
Creates a new user and company. Sends a verification email.

**Request Body:**
```json
{
  "firstname": "Jane",
  "lastname": "Doe",
  "email": "jane@example.com",
  "password": "securepassword",
  "company_name": "Doe Enterprises"
}
```

**Responses:**
| Status | Meaning |
|---|---|
| `201` | User created — check email for verification link |
| `400` | Already logged in, or bad content type |
| `404` | Missing required field |

---

### `GET /user` — Get Current User
Returns the authenticated user's profile.

**Auth required:** Yes

---

### `PUT /user/{id}` — Update User
Updates profile information for the authenticated user.

**Auth required:** Yes  
**Request Body:** Any subset of `{ firstname, lastname, email }`

---

### `DELETE /user/{admin_id}` — Delete User
Admin-only. Deletes a user from the system.

**Auth required:** Yes (admin)

---

### `GET /user/verifyemail/{token}` — Verify Email
Validates the email verification token and marks the user's email as verified.

---

### `POST /login` — Login
Creates an authenticated session.

**Request Body:**
```json
{ "email": "jane@example.com", "password": "securepassword" }
```

**Responses:**
| Status | Meaning |
|---|---|
| `200` | Login successful — session cookie set |
| `400` | Missing fields or already logged in |
| `401` | Invalid credentials |

---

### `POST /logout` — Logout
Destroys the current session.

**Auth required:** Yes

---

### `POST /forgotpassword` — Forgot Password
Sends a password reset email.

**Request Body:** `{ "email": "jane@example.com" }`

---

### `PUT /resetpassword/{token}` — Reset Password
Validates the reset token and updates the password.

**Request Body:**
```json
{ "password": "newpassword", "confirm_password": "newpassword" }
```

---

### `PUT /user/{user_id}/change-password` — Change Password
Changes the password for the authenticated user (requires old password).

**Auth required:** Yes  
**Request Body:**
```json
{ "oldPassword": "current", "newPassword": "newpass" }
```

---

### `GET /protected` — Check Auth Status
Returns the current user's auth status. Useful for frontend auth guards.

**Response:**
```json
{ "message": "User is authenticated", "response": { ...user } }
```

---

## Company

### `PUT /company/{company_id}` — Update Company
Updates company information (name, email, country, currency).

**Auth required:** Yes  
**Request Body:** Any subset of `{ name, email, country, currency }`

---

### `GET /{user_id}/getcompanies` — Get Companies for User
Returns all companies associated with the given user.

---

### `PUT /{company_id}/select_organization` — Set Active Company
Sets the company context for the current user's session.

**Auth required:** Yes

---

## Accounts

### `GET /accounts` — List Accounts
Returns all accounts for the current user's selected company.

**Auth required:** Yes

---

### `POST /account` — Create Account
Creates a new ledger account.

**Auth required:** Yes  
**Request Body:**
```json
{
  "name": "Cash",
  "category": "asset",
  "sub_category": "current asset"
}
```

---

### `PUT /account/{account_id}` — Update Account
Updates an account's name, category, or sub-category.

**Auth required:** Yes

---

### `DELETE /account/{account_id}` — Delete Account
Deletes an account (cascades to journal entries).

**Auth required:** Yes

---

## Transactions

### `POST /api/addsales` — Record a Sale
Records a sales transaction with journal entries and stock movements.

**Auth required:** Yes  
**Request Body:**
```json
{
  "date": "2024-03-31",
  "description": "Sales of products",
  "category": "sales",
  "entries": [
    { "account_id": "uuid-abc", "debit": 0, "credit": 800 },
    { "account_id": "uuid-xyz", "debit": 800, "credit": 0 }
  ],
  "stocks": [
    { "stock_id": "uuid-123", "units": 10, "price": 120 }
  ]
}
```

**Responses:** `201 Created` or error details.

---

### `POST /api/addpurchase` — Record a Purchase
Records a purchase transaction with journal entries and stock movements.

**Auth required:** Yes  
**Request Body:** Same structure as `/api/addsales` with `"category": "purchase"`.

---

### `POST /api/salesreturn` — Record a Sales Return

**Auth required:** Yes  
**Request Body:**
```json
{
  "date": "2024-03-31",
  "description": "Return of defective items",
  "category": "sales return",
  "units": 2,
  "stock_entry_id": "uuid-entry"
}
```

---

### `POST /api/purchasereturn` — Record a Purchase Return

**Auth required:** Yes  
**Request Body:** Same structure as `/api/salesreturn` with `"category": "purchase return"`.

---

### `GET /transactions` — List Transactions
Returns transactions for the current user's company.

**Auth required:** Yes

---

## Stock

### `POST /api/addstock` — Create Stock Item
**Auth required:** Yes  
**Request Body:** `{ "name": "Product X" }`

---

### `GET /api/stock/{stock_id}` — Get Stock Item
**Auth required:** Yes  
**Response:** Stock item details including all entries.

---

### `PUT /api/stock/{stock_id}` — Update Stock Item
**Auth required:** Yes  
**Request Body:** `{ "name": "Updated Product X" }`

---

### `DELETE /api/stock/{stock_id}` — Delete Stock Item
**Auth required:** Yes  
**Response:** `200 OK`

---

### `GET /api/stockentries` — Get Stock Entries by Category
**Auth required:** Yes  
**Request Body:** `{ "category": "sales" }` or `"purchase"`

---

## Reports

### `GET /report/profitloss` — Profit & Loss Statement
**Auth required:** Yes  
**Query Params:** `start` (YYYY-MM-DD), `end` (YYYY-MM-DD)  
**Response:** Revenues, expenses, and net income for the period.

---

### `GET /report/balancesheet` — Balance Sheet
**Auth required:** Yes  
**Response:** Assets, liabilities, and capital/equity snapshot.

---

### `GET /report/trialbalance` — Trial Balance
**Auth required:** Yes  
**Response:** All accounts with debit and credit totals; confirms books are balanced.

---

→ Back to [docs index](../README.md)
