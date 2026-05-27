import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Step1CompanyVerify from "../pages/Step1CompanyVerify";
import Step2UserDetails from "../pages/Step2UserDetails";
import Step3OtpVerify from "../pages/Step3OtpVerify";
import Step4LoginCredentials from "../pages/Step4LoginCredentials";
import Step5Interests from "../pages/Step5Interests";
import Step6WellbeingPillars from "../pages/Step6WellbeingPillars";
import Step7FinalRegistration from "../pages/Step7FinalRegistration";
import Step8Welcome from "../pages/Step8Welcome";

const StepGuard = ({ requiredStep, children }) => {
  const currentStep = useSelector((s) => s.registration.currentStep);
  if (currentStep < requiredStep) return <Navigate to="/register" replace />;
  return children;
};

const STEP_ROUTES = {
  1: "/register",
  2: "/register/user-details",
  3: "/register/verify-otp",
  4: "/register/credentials",
  5: "/register/interests",
  6: "/register/pillars",
  7: "/register/finalizing",
  8: "/register/welcome",
};

const RedirectToCurrentStep = () => {
  const currentStep = useSelector((s) => s.registration.currentStep);
  return <Navigate to={STEP_ROUTES[currentStep] || "/register"} replace />;
};

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RedirectToCurrentStep />} />
      <Route path="/register" element={<Step1CompanyVerify />} />
      <Route path="/register/user-details" element={<StepGuard requiredStep={2}><Step2UserDetails /></StepGuard>} />
      <Route path="/register/verify-otp" element={<StepGuard requiredStep={3}><Step3OtpVerify /></StepGuard>} />
      <Route path="/register/credentials" element={<StepGuard requiredStep={4}><Step4LoginCredentials /></StepGuard>} />
      <Route path="/register/interests" element={<StepGuard requiredStep={5}><Step5Interests /></StepGuard>} />
      <Route path="/register/pillars" element={<StepGuard requiredStep={6}><Step6WellbeingPillars /></StepGuard>} />
      <Route path="/register/finalizing" element={<StepGuard requiredStep={7}><Step7FinalRegistration /></StepGuard>} />
      <Route path="/register/welcome" element={<StepGuard requiredStep={8}><Step8Welcome /></StepGuard>} />
      <Route path="*" element={<RedirectToCurrentStep />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
