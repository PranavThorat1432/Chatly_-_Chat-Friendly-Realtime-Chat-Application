import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { Mail, Lock, Eye, EyeOff, User, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

const Signup = () => {

    const [show, setShow ] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`, {
                userName, email, password
            }, {withCredentials: true});

            dispatch(setUserData(result?.data));
            navigate('/profile');
            setEmail('');
            setPassword('');
            setLoading(false);
            setError('');

        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error.response.data.message);
        }
    }

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 flex justify-center items-center p-4 relative overflow-hidden'>
        {/* Animated background elements */}
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
            <div className='absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
            <div className='absolute top-40 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
            <div className='absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
        </div>

        <div className='w-full max-w-md relative z-10'>
            {/* Card with glassmorphism effect */}
            <div className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-300 hover:shadow-purple-200/50'>
                
                {/* Header Section */}
                <div className='relative bg-linear-to-br from-purple-500 via-pink-500 to-indigo-600 px-8 py-12 text-center'>
                    <div className='absolute inset-0 bg-black/10'></div>
                    <div className='relative z-10'>
                        <div className='inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl mb-4 transform transition-transform duration-300 hover:scale-110'>
                            <MessageCircle className='w-10 h-10 text-white' strokeWidth={2.5} />
                        </div>
                        <h1 className='text-3xl font-bold text-white mb-2 tracking-tight'>Join Chatly</h1>
                        <p className='text-purple-100 text-sm font-medium flex items-center justify-center gap-1'>
                            <Sparkles className='w-4 h-4' />
                            Create your account to get started
                        </p>
                    </div>
                    {/* Decorative wave */}
                    <div className='absolute -bottom-1 left-0 right-0'>
                        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white" fillOpacity="0.8"/>
                        </svg>
                    </div>
                </div>

                {/* Form Section */}
                <div className='px-8 py-10'>
                    <form className='space-y-5' onSubmit={handleSignup}>
                        
                        {/* Username Input */}
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 ml-1'>Username</label>
                            <div className='relative group'>
                                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                    <User className='w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors' />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder='Choose a username' 
                                    className='w-full h-12 pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:bg-white transition-all duration-200 text-gray-700 placeholder:text-gray-400'
                                    onChange={(e) => setUserName(e.target.value)} 
                                    value={userName}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 ml-1'>Email Address</label>
                            <div className='relative group'>
                                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                    <Mail className='w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors' />
                                </div>
                                <input 
                                    type="email" 
                                    placeholder='Enter your email' 
                                    className='w-full h-12 pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:bg-white transition-all duration-200 text-gray-700 placeholder:text-gray-400'
                                    onChange={(e) => setEmail(e.target.value)} 
                                    value={email}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 ml-1'>Password</label>
                            <div className='relative group'>
                                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                    <Lock className='w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors' />
                                </div>
                                <input 
                                    type={show ? 'text' : 'password'} 
                                    placeholder='Create a password' 
                                    className='w-full h-12 pl-12 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:bg-white transition-all duration-200 text-gray-700 placeholder:text-gray-400'
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password}
                                    required
                                />
                                <button
                                    type='button'
                                    className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-shake'>
                                <p className='font-medium'>{error}</p>
                            </div>
                        )}

                        {/* Terms and Conditions */}
                        <div className='bg-linear-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4'>
                            <div className='flex items-start gap-3'>
                                <CheckCircle2 className='w-5 h-5 text-purple-500 shrink-0 mt-0.5' />
                                <p className='text-xs text-gray-600 leading-relaxed'>
                                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </div>

                        {/* Signup Button */}
                        <button 
                            type='submit'
                            className='w-full h-12 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6 cursor-pointer'
                            disabled={loading}
                        >
                            {loading ? (
                                <div className='flex items-center justify-center gap-2'>
                                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                    <span>Creating account...</span>
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        {/* Divider */}
                        <div className='relative my-6'>
                            <div className='absolute inset-0 flex items-center'>
                                <div className='w-full border-t border-gray-200'></div>
                            </div>
                            <div className='relative flex justify-center text-sm'>
                                <span className='px-4 bg-white text-gray-500 font-medium'>or</span>
                            </div>
                        </div>

                        {/* Login Link */}
                        <div className='text-center'>
                            <p className='text-gray-600'>
                                Already have an account?{' '}
                                <button
                                    type='button'
                                    className='text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors cursor-pointer'
                                    onClick={() => navigate('/login')}
                                >
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <div className='text-center mt-6 text-sm text-gray-500'>
                <p>© 2024 Chatly. All rights reserved.</p>
            </div>
        </div>
    </div>
  )
}

export default Signup
