import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Button, Input } from "@material-tailwind/react";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loginType, setLoginType] = useState('admin');
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ userId: '', emailId: '', password: '' });

  // This effect runs once on mount to show any errors passed from other pages.
  useEffect(() => {
    const error = location.state?.error || searchParams.get('error');
    if (error) {
      toast.error(error);
      // Clean up URL and state to prevent re-showing toast on refresh
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('error');
      navigate(
        { pathname: location.pathname, search: newSearchParams.toString() },
        { replace: true, state: {} } // Clear location state
      );
    }
  }, []);

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginType = (type) => {
    setLoginType(type);
    setLoginForm({ userId: '', emailId: '', password: '' }); // Reset form fields
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // NOTE: Artificial delay to showcase the skeleton loader.
    // This should be removed in production.
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      // Choose payload and endpoint based on loginType
      let payload, endpoint;
      if (loginType === 'admin') {
        payload = { userId: loginForm.userId, password: loginForm.password };
        endpoint = 'http://localhost:3000/api/auth/login';
      } else {
        payload = { emailId: loginForm.emailId, password: loginForm.password };
        endpoint = 'http://localhost:3000/api/auth/login';
      }
      const response = await axios.post(endpoint, payload, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.success) {
        toast.success('Login successful!');
        // Store user details in localStorage
        const { user } = response.data;
        localStorage.setItem('Username', user.firstName);
        localStorage.setItem('Initial', user.lastName);
        localStorage.setItem('U_Id', user.userId);
        localStorage.setItem('U_email', user.emailId);
        localStorage.setItem('U_type', user.userType);
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      console.error('Login error:', err);
    } finally {
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
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">Log In</h2>
          {/* Login type buttons */}
          <div className="flex justify-center mb-6 space-x-4">
            <Button
              type="button"
              onClick={() => handleLoginType('client')}
              className={`py-2 px-6 rounded-xl font-semibold transition-all duration-150 ${loginType === 'client'
                ? 'bg-cyan-400 text-white shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff]'
                : 'bg-slate-100 text-cyan-600 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] hover:bg-cyan-50'}`}
            >
              Client User
            </Button>
            <Button
              type="button"
              onClick={() => handleLoginType('admin')}
              className={`py-2 px-6 rounded-xl font-semibold transition-all duration-150 ${loginType === 'admin'
                ? 'bg-cyan-400 text-white shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff]'
                : 'bg-slate-100 text-cyan-600 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] hover:bg-cyan-50'}`}
            >
              Admin User
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            {loginType === 'admin' ? (
              <>
                <Input
                  type="text"
                  name="userId"
                  autoComplete="username"
                  placeholder="User ID"
                  className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
                  onChange={handleChange}
                  value={loginForm.userId}
                />
                <Input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
                  onChange={handleChange}
                  value={loginForm.password}
                />
              </>
            ) : (
              <>
                <Input
                  type="email"
                  name="emailId"
                  autoComplete="username"
                  placeholder="Email ID"
                  className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
                  onChange={handleChange}
                  value={loginForm.emailId}
                />
                <Input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
                  onChange={handleChange}
                  value={loginForm.password}
                />
              </>
            )}
            <div className="text-left">
              <a href="#" className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline mt-[0.625rem] block">
                Forgot password?
              </a>
            </div>
            <div className="flex justify-center items-center mt-6">
              <Button
                type="submit"
                className={`py-3 px-8 bg-slate-100 text-cyan-600 font-semibold rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] active:text-cyan-700 transition-all duration-150 ease-in-out ${
                  isLoading && 'animate-pulse'
                }`}
                disabled={isLoading}
              >
                <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
                  Log In
                </span>
              </Button>
            </div>
          </form>
          <p className="text-center mt-6 text-sm text-slate-600">
            New user?{" "}
            <NavLink to="/signup" className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline">
              Create Account
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
