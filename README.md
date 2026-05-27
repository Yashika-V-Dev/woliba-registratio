# Woliba Registration Flow

A production-ready multi-step user registration application for the Woliba employee wellness platform.

## Project Overview

This app provides an 8-step registration flow for new Woliba users, including company verification, OTP email authentication, profile setup, interest selection, and wellbeing pillar selection.

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework |
| Redux Toolkit | 2.x | State management |
| Redux Persist | 6.x | Persistent state |
| React Router DOM | 6.x | Routing & navigation |
| Axios | 1.x | HTTP client |
| React Hook Form | 7.x | Form handling |
| Yup | 1.x | Schema validation |
| React Toastify | 10.x | Notifications |
| Tailwind CSS | 3.x | Styling |

## Folder Structure

```
src/
├── api/                    # Axios instance & interceptors
├── components/
│   ├── common/             # Input, Button, PasswordInput, DatePickerModal, WolibaLogo, BackgroundCharacters
│   ├── layout/             # AuthLayout
│   └── loaders/            # Spinner, FullscreenLoader, SkeletonCard
├── hooks/                  # useStepNavigation
├── pages/                  # Step1–Step8 pages
├── redux/
│   ├── store.js
│   └── slices/registrationSlice.js
├── routes/                 # AppRouter (also in App.js)
├── services/
│   ├── registrationService.js   # Real API calls
│   └── mockService.js           # Mock services for development
├── styles/index.css
├── validations/registrationValidations.js
└── App.js
```

## Setup Instructions

### 1. Clone the repository
```bash
git clone <https://github.com/Yashika-V-Dev/woliba-registratio.git>
cd woliba-registration
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Configure environment variables
```bash
cp .env .env.local
```
Edit `.env.local`:
```
REACT_APP_API_BASE_URL=https://your-api-url.com/api/v1
REACT_APP_ENV=development
```

### 4. Start development server
```bash
npm start
```
App will run at `http://localhost:3000`

## Registration Flow

| Step | Route | Description |
|---|---|---|
| 1 | `/register` | Company name & password verification |
| 2 | `/register/user-details` | Email, first name, last name |
| 3 | `/register/verify-otp` | 6-digit OTP verification |
| 4 | `/register/credentials` | Password, DOB, contact number |
| 5 | `/register/interests` | Multi-select wellness interests |
| 6 | `/register/pillars` | Select exactly 3 wellbeing pillars |
| 7 | `/register/finalizing` | Final API call with fullscreen loader |
| 8 | `/register/welcome` | Success screen |

## API Integration

### Switch from Mock to Real APIs

In each page file, replace the mock service import:
```js
// Mock (development)
import { mockVerifyCompany } from "../services/mockService";
const res = await mockVerifyCompany(data);

// Real (production)
import { verifyCompany } from "../services/registrationService";
const res = await verifyCompany(data);
```

### API Endpoints

| Endpoint | Method | Usage |
|---|---|---|
| `/verify-by-company-name-and-password` | POST | Step 1 |
| `/save-user-details-and-send-otp` | POST | Step 2 |
| `/verify-otp-for-user-registration` | POST | Step 3 |
| `/resend-otp` | POST | Step 3 resend |
| `/viewWellnessInterest` | GET | Step 5 |
| `/user-registration` | POST | Step 7 |

## Deployment — Vercel

### One-click deploy
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Manual setup
1. Push code to GitHub
2. Connect repo on [vercel.com](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy

### vercel.json (create in project root)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## Assumptions

- Mock services simulate real API behavior with ~1s delays
- OTP mock accepts any 6-digit code (test with `724106`)
- Company password validation: min 8 chars, 1 uppercase, 1 number
- Redux state persists to localStorage via redux-persist
- Step guards prevent direct URL access to future steps

## Screenshots

All 8 registration screens matching the provided Figma design with:
- Woliba logo top-left
- Language selector top-right
- Background fitness character illustrations (subtle, low opacity)
- Centered white card with clean form layout
- Woliba red (`#C8515A`) primary color
- DM Sans font family
- Terms of Use / Contact Us footer links
