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
git clone https://github.com/Yashika-V-Dev/woliba-registratio.git
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

## Deployment — netlify
netlify : https://sparkly-mermaid-15aac9.netlify.app


## Preview Images:

Screen 1:
<img width="1357" height="632" alt="image" src="https://github.com/user-attachments/assets/14c23e41-8dcc-4647-ba31-cff943935b90" />

Screen 2: 
<img width="1339" height="622" alt="image" src="https://github.com/user-attachments/assets/4856645b-0285-4763-b15c-1e6f261aa4b4" />

Screen 3:
<img width="1352" height="635" alt="Screen3" src="https://github.com/user-attachments/assets/fdd09397-ac5e-47bf-8c21-62ce1f7786af" />

Screen 4 :
<img width="1325" height="631" alt="image" src="https://github.com/user-attachments/assets/69fc20de-5b43-45d8-bb60-1dd4798622b9" />

Scrren 5:
<img width="1355" height="635" alt="image" src="https://github.com/user-attachments/assets/abd852f4-946c-491a-9f35-656f53f39332" />

Screen 6 :
<img width="1357" height="632" alt="image" src="https://github.com/user-attachments/assets/378cfbb3-9731-452b-806d-ea9dc36c6dda" />

Screen 7 :
<img width="1320" height="605" alt="image" src="https://github.com/user-attachments/assets/0048b213-626a-4322-bd4c-cafe7fbe92c1" />

Screen 8 :
<img width="1139" height="602" alt="image" src="https://github.com/user-attachments/assets/f5aa6205-1ffd-434c-b7fc-a0939ea0d2e8" />


