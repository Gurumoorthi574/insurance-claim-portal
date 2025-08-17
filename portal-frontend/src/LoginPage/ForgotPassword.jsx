import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { Button, Input } from "@material-tailwind/react";

const ForgotPassword = () => {
    const [emailId, setEmailId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailId) {
            toast.error("Please enter your email address.");
            return;
        }
        if (!emailRegex.test(emailId)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        setIsLoading(true);

        console.log("Sending reset link to:", emailId);

        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
            const resetEndpoint = `${apiBaseUrl}/auth/forgot-password`;

            const response = await axios.post(resetEndpoint, { emailId: emailId }, {
                withCredentials: true,
            });
            if (response.status === 200 && response.data.success) {
                setIsSubmitted(true);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message || 'Failed to send reset link.');
            }
        }
        catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data || 'Failed to send reset link. Please try again later.';
            toast.error(errorMessage);
            console.error('Error during password reset:', err);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#22c55e',
              color: 'white',
            },
          },
          error: { style: { background: '#dc2626', color: 'white' } },
        }}
      />
      {/* Left Image Side */}
      <div className="md:w-1/2 hidden md:block">
        <img
          src="/Insurance Types Overview in Blue.png"
          alt="Insurance Illustration"
          className="w-full h-full object-center"
        />
      </div>
      {/* Right side */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-slate-100">
        <div className="w-full max-w-sm bg-slate-100 p-8 rounded-2xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff]">
          <img
            src="/Guru Health Insurance Logo Design.png"
            alt="Insurance Illustration"
            className="w-30 m-auto"
          />
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">Forgot Password</h2>
          
          {isSubmitted ? (
            <div className="text-center text-slate-700">
              <p>If an account with the email <span className="font-semibold">{emailId}</span> exists, a password reset link has been sent.</p>
              <p className="mt-4">Please check your inbox (and spam folder).</p>
              <NavLink to="/login" className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline mt-6 block">
                Back to Login
              </NavLink>
            </div>
          ) : (
            <>
              <p className="text-center mb-6 text-sm text-slate-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  name="emailId"
                  autoComplete="email"
                  placeholder="Email ID"
                  className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
                  onChange={(e) => setEmailId(e.target.value)}
                  value={emailId}
                />
                <div className="flex justify-center items-center mt-6">
                  <Button
                    type="submit"
                    className={`py-3 px-8 bg-slate-100 text-cyan-600 font-semibold rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] active:text-cyan-700 transition-all duration-150 ease-in-out ${
                      isLoading && 'animate-pulse'
                    }`}
                    disabled={isLoading}
                  >
                    <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
                      Send Reset Link
                    </span>
                  </Button>
                </div>
              </form>
              <p className="text-center mt-6 text-sm text-slate-600">
                Remember your password?{" "}
                <NavLink to="/login" className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline">
                  Log In
                </NavLink>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;