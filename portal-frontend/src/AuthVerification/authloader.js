import axios from "axios";
import { redirect } from "react-router-dom";

export const tokenVerificationLoader = async () => {
   let endpoint = 'http://localhost:3000/api/auth';
  try {
    const response = await axios.get(endpoint, {
      withCredentials: true,
    });
    return {
      isAuthenticated: true,
      userType: response.data.userType,
    };
  } catch (error) {
    const errorMsg = error?.response?.data?.message || 'Session expired. Please login again.';
    return redirect('/login?error=' + encodeURIComponent(errorMsg));
  }
};