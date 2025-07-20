import { createBrowserRouter } from 'react-router'
import Login from "../LoginPage/Login"
import Signup from "../LoginPage/Signup"
import Dashboard from '../Dashboard'
import { InsuranceStepper } from '../Stepper/claim_stepper'
import ClaimHistory from '../History/ClaimHistory'


const router = createBrowserRouter([
  {
    path: "/",
    Component: Login
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
    path: "/dashboard",
    Component: Dashboard
  },
  {
    path: "/stepper",
    Component: InsuranceStepper
  },
  {
    path: "/stepper/:claimId", 
    Component: InsuranceStepper
  },
  {
    path: "/history",
    Component: ClaimHistory
  }
]) 

export default router