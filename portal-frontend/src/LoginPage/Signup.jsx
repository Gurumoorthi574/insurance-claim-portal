import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Notification component for top-right popup
const Notification = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-3 rounded shadow-lg flex items-center animate-slide-in">
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

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', signupForm);
      if (response.status === 201) {
        setSuccess('Signup successful! Please log in.');
        if (response.data === 'Success') {
          navigate('/login');
        }
        setSignupForm({
          firstName: '',
          lastName: '',
          emailId: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Please enter the required fields");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
      {/* Notification Popup */}
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
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">Sign Up</h2>
          {/* Success message can remain inline */}
          {success && <div className="text-green-600 text-center mb-2">{success}</div>}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
              onChange={handleChange}
              value={signupForm.firstName}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
              onChange={handleChange}
              value={signupForm.lastName}
            />
            <input
              type="email"
              name="emailId"
              placeholder="Email id/Mobile number"
              className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
              onChange={handleChange}
              value={signupForm.emailId}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
              onChange={handleChange}
              value={signupForm.password}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
              onChange={handleChange}
              value={signupForm.confirmPassword}
            />
            <div className="flex justify-center items-center mt-6">
              <button type="submit" className="w-full py-3 px-8 bg-slate-100 text-cyan-600 font-semibold rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] active:text-cyan-700 transition-all duration-150 ease-in-out" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
          <p className="text-center mt-6 text-sm text-slate-600">
            Already have an account?
            <NavLink to="/" className='font-semibold text-cyan-600 hover:text-cyan-700 hover:underline ml-1'>
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;