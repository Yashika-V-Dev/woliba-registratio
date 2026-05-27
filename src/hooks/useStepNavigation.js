import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

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

const useStepNavigation = () => {
  const currentStep = useSelector((s) => s.registration.currentStep);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const targetRoute = STEP_ROUTES[currentStep];
    if (targetRoute && location.pathname !== targetRoute) {
      navigate(targetRoute, { replace: true });
    }
  }, [currentStep]);
};

export default useStepNavigation;
