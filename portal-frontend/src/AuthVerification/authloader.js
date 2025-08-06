import axios from "axios";
import { redirect } from "react-router-dom";

export const tokenVerificationLoader = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/auth',
      { withCredentials: true }
    );
    if (response.status !== 200) {
      throw redirect('/login');
    }
    return { isAuthenticated: true, userType: response.data.userType };
  } catch (error) {
    throw redirect('/login');
  }
}