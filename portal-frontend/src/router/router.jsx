import { createBrowserRouter } from 'react-router-dom';
import Login from "../LoginPage/Login";
import Signup from "../LoginPage/Signup";
import Dashboard from '../FormComponent/Dashboard';
import { InsuranceStepper } from '../Stepper/claim_stepper';
import ClaimHistory from '../History/ClaimHistory';
import { tokenVerificationLoader } from '../AuthVerification/authloader';
import ForgotPassword from '../LoginPage/ForgotPassword';
import ResetPassword from '../LoginPage/ResetPassword';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/signup",
    Component: Signup
  },
  {
    path: "/forgot",
    Component: ForgotPassword
  },
  {
    path: "/reset-password/:token",
    Component: ResetPassword
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    loader: tokenVerificationLoader
  },
  {
    path: "/stepper",
    Component: InsuranceStepper,
    loader: tokenVerificationLoader
  },
  {
    path: "/stepper/:claimId", 
    Component: InsuranceStepper,
    loader: tokenVerificationLoader
  },
  {
    path: "/history",
    Component: ClaimHistory,
    loader: tokenVerificationLoader
  }
]);

export default router;