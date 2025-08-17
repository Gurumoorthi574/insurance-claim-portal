import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Button, Input } from '@material-tailwind/react';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        setIsLoading(true);

        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
            const reToken = `${token}`;
            const apiUrl = `${apiBaseUrl}/auth/reset-password/${reToken}`;
            const resetEndpoint = apiUrl;

            const response = await axios.post(resetEndpoint, { password: password }, {
                withCredentials: true,
            });
            if (response.data.success) {
                toast.success("Password has been reset successfully! You can now log in.");
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(response.data.message || 'Failed to reset password.');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'An error occurred. The link may be invalid or expired.';
            toast.error(errorMessage);
            console.error('Error during password reset:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: '#22c55e',
                            color: 'white',
                        },
                    },
                    error: {
                        style: {
                            background: '#ef4444',
                            color: 'white',
                        },
                    },
                }}
            />
            <div className="w-full max-w-sm bg-slate-100 p-8 rounded-2xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff]">
                <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">Reset Your Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff]"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                    />
                    <div className="flex justify-center items-center">
                        <Button
                            type="submit"
                            className={`w-full py-3 px-8 bg-slate-100 text-cyan-600 font-semibold rounded-xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#cbd5e1,_-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-4px_-4px_8px_#ffffff] active:text-cyan-700 transition-all duration-150 ease-in-out ${isLoading && 'animate-pulse'}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;