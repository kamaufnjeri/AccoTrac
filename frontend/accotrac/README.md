# Accotrac - Frontend

## Tech Stack

| Component | Technology |
|---|---|
| Framework | React 18 |
| Routing | React Router v6 |
| HTTP Client | Axios |
| UI Components | Bootstrap 5, MDB React UI Kit, React-Bootstrap |
| Icons | FontAwesome (react-fontawesome) |
| Notifications | React-Toastify |
| Build Tool | Create React App (react-scripts 5) |

---

## Project Structure

```
frontend/accotrac/
├── public/
├── src/
│   ├── App.js              # Root component with route definitions
│   ├── pages/              # Full-page view components
│   │   ├── Home.jsx        # Public landing page
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── DashBoard.jsx
│   │   ├── ChartsOfAccountPage.jsx
│   │   ├── AddAccountPage.jsx
│   │   ├── GeneralJournalPage.jsx
│   │   ├── JournalEntriesPage.jsx
│   │   ├── ProfitLossPage.jsx
│   │   ├── BalanceSheetPage.jsx
│   │   ├── TrialBalancePage.jsx
│   │   ├── OrganizationProfilePage.jsx
│   │   ├── UserProfilePage.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   └── VerifyEmail.jsx
│   ├── components/         # Reusable UI components
│   ├── methods/            # API call functions (Axios wrappers)
│   └── utils/              # Shared helper functions
├── package.json
└── .env                    # Frontend environment variables
```

---

## Pages Overview

| Route | Page | Auth Required |
|---|---|---|
| `/` | Home (landing page) | No |
| `/about` | About | No |
| `/contact` | Contact | No |
| `/login` | Login | No |
| `/signup` | Sign Up | No |
| `/dashboard` | Dashboard | Yes |
| `/accounts` | Chart of Accounts | Yes |
| `/journal` | General Journal | Yes |
| `/profit-loss` | Profit & Loss Report | Yes |
| `/balance-sheet` | Balance Sheet | Yes |
| `/trial-balance` | Trial Balance | Yes |
| `/profile` | User Profile | Yes |
| `/organization` | Organization Profile | Yes |

---

## Setup

### 1. Install dependencies
```bash
cd frontend/accotrac
npm install
```

### 2. Configure environment
Create a `.env` file in `frontend/accotrac/`:
```env
REACT_APP_API_URL=http://localhost:5000
```
> The app is pre-configured with a proxy to `http://localhost:5000` (see `package.json`), so this variable is optional in development.

### 3. Start development server
```bash
npm start
# App available at http://localhost:3000
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server on port 3000 |
| `npm run build` | Build optimised production bundle to `/build` |
| `npm test` | Run test suite |
| `npm run start-api` | Convenience script — also starts the Flask backend |

---

## Deployment

The production build (`npm run build`) generates a `/build` folder with static files that can be served by any web server (Nginx, Apache, cPanel file manager).

→ See [hosting](../../docs/deployment/hosting.md) for full deployment instructions.
