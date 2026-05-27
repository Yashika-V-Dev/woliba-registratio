import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ErrorBoundary from './components/common/ErrorBoundary'
import StepCompanyVerify from './pages/StepCompanyVerify'
import StepUserDetails from './pages/StepUserDetails'
import StepOtpVerify from './pages/StepOtpVerify'
import StepCredentials from './pages/StepCredentials'
import StepInterests from './pages/StepInterests'
import StepPillars from './pages/StepPillars'
import StepFinalRegistration from './pages/StepFinalRegistration'
import StepWelcome from './pages/StepWelcome'

const StepGuard = ({ requiredStep, children }) => {
  const currentStep = useSelector((state) => state.registration.currentStep)
  if (currentStep < requiredStep) return <Navigate to="/register" replace />
  return children
}

const RegistrationRouter = () => {
  const currentStep = useSelector((state) => state.registration.currentStep)

  const steps = {
    1: <StepCompanyVerify />,
    2: <StepUserDetails />,
    3: <StepOtpVerify />,
    4: <StepCredentials />,
    5: <StepInterests />,
    6: <StepPillars />,
    7: <StepFinalRegistration />,
    8: <StepWelcome />,
  }

  return steps[currentStep] || <StepCompanyVerify />
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<RegistrationRouter />} />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
