import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button, Input } from "@material-tailwind/react";


// Notification component for bottom-center popup
const Notification = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-5 py-2 rounded shadow-lg flex items-center">
      <span>{message}</span>
      <button
        className="ml-4 text-white font-bold"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

const Login = () => {
  const [loginForm, setLoginForm] = useState({ emailId: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    setError('');
  }, []);

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', loginForm, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.success) {
        navigate('/dashboard');
        console.log('Login successful:', response.data);
      } else {
        setError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      // Show backend error message if available, otherwise a generic one.
      setError(
        // The backend sends a plain string error, not a JSON object
        err.response?.data || 'Login failed. Please check your credentials.'
      );
      console.error('Login error:', err);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
     
      <Notification message={error} onClose={() => setError('')} />

      {/* Left Image Side */}
      <div className="md:w-1/2 hidden md:block">
        <img
          src="/Insurance.png"
          alt="Insurance Illustration"
          className="w-full h-full object-center"
        />
      </div>
      {/*right side*/}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-slate-100">
        <div className="w-full max-w-sm bg-slate-100 p-8 rounded-2xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff]">
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">Log In</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              name="emailId"
              placeholder="Email id/Mobile number"
              className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
              onChange={handleChange}
              value={loginForm.emailId}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
              onChange={handleChange}
              value={loginForm.password}
            />
            <div className="text-left">
              <a href="#" className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline mt-[0.625rem] block">
                Forgot password?
              </a>
            </div>
            <div className="flex justify-center items-center mt-6">
              <Button  type="submit" className="py-3 px-8 bg-slate-100 text-cyan-600 font-semibold rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] active:text-cyan-700 transition-all duration-150 ease-in-out">
                Log In
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
