import React, { useState } from 'react';
import { useAccount } from '../../context/AccountContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginProps {
    toggleView: () => void;
}

const Login: React.FC<LoginProps> = ({ toggleView }) => {
    const { login } = useAccount();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(formData.email, formData.password);
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-500 text-sm">Sign in to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                        {error}
                    </div>
                )}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-600">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            required
                            className="w-full border border-gray-100 bg-gray-50 pl-12 pr-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-600">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        <input
                            type="password"
                            required
                            className="w-full border border-gray-100 bg-gray-50 pl-12 pr-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-dark-green transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                    {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                <p className="text-gray-500 text-sm">
                    Don't have an account?
                    <button onClick={toggleView} className="ml-2 font-bold text-primary hover:underline">
                        Create one now
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
