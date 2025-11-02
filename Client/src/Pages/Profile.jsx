import React, { useRef, useState } from 'react'
import profilePic from '../assets/profilePic.png';
import { IoCameraOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { Camera, ArrowLeft, User, Mail, AtSign, Save, CheckCircle2, ImagePlus } from 'lucide-react';

const Profile = () => {

  const {userData} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(userData.name || '');
  const [frontendImage, setFrontendImage] = useState(userData.image || profilePic);
  const [backendImage, setBackendImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const image = useRef();

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let formData = new FormData();

      formData.append('name', name);
      if(backendImage) {
        formData.append('image', backendImage);
      }

      let result = await axios.put(`${serverUrl}/api/user/edit-profile`, formData, {
        withCredentials: true
      });
      setSaving(false);
      dispatch(setUserData(result.data));
      navigate('/');

    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  }

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center p-4 relative overflow-hidden'>
        {/* Animated background elements */}
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
            <div className='absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
            <div className='absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
            <div className='absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
        </div>

        {/* Back Button */}
        <button 
            onClick={() => navigate('/')} 
            className='fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 text-gray-700 font-semibold hover:bg-white transition-all duration-200 transform hover:scale-105 group cursor-pointer'
        >
            <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
            <span className='hidden sm:inline'>Back</span>
        </button>

        <div className='w-full max-w-2xl relative z-10'>
            {/* Main Card */}
            <div className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden'>
                
                {/* Header Section with linear */}
                <div className='relative bg-linear-to-br from-blue-500 via-indigo-600 to-purple-600 px-8 py-16 text-center'>
                    <div className='absolute inset-0 bg-black/10'></div>
                    <div className='relative z-10'>
                        <h1 className='text-3xl font-bold text-white mb-2 tracking-tight'>Edit Profile</h1>
                        <p className='text-blue-100 text-sm font-medium'>Update your personal information</p>
                    </div>
                    {/* Decorative wave */}
                    <div className='absolute -bottom-1 left-0 right-0'>
                        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white" fillOpacity="0.8"/>
                        </svg>
                    </div>
                </div>

                {/* Profile Picture Section */}
                <div className='relative -mt-15 flex justify-center px-8'>
                    <div className='relative group'>
                        <div 
                            className='w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl cursor-pointer transform transition-all duration-300 group-hover:scale-105 bg-linear-to-br from-blue-400 to-purple-500'
                            onClick={() => image.current.click()}
                        >
                            <img 
                                src={frontendImage} 
                                alt="Profile" 
                                className='h-full w-full object-cover' 
                            />
                        </div>
                        
                        {/* Camera Icon Overlay */}
                        <div 
                            className='absolute bottom-2 right-2 w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg border-4 border-white transform transition-all duration-300 hover:scale-110 group-hover:rotate-12'
                            onClick={() => image.current.click()}
                        >
                            <Camera className='w-5 h-5 text-white' />
                        </div>
                        
                        {/* Upload hint on hover */}
                        <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <div className='bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1'>
                                <ImagePlus className='w-3 h-3' />
                                Click to change photo
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className='px-8 py-10 mt-8'>
                    <form className='space-y-6' onSubmit={handleProfile}>
                        <input type="file" accept='image/*' ref={image} hidden onChange={handleImage}/>
                        
                        {/* Name Input */}
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2'>
                                <User className='w-4 h-4 text-blue-500' />
                                Display Name
                            </label>
                            <div className='relative group'>
                                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                    <User className='w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors' />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder='Enter your name' 
                                    className='w-full h-12 pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-700 placeholder:text-gray-400'
                                    onChange={(e) => setName(e.target.value)} 
                                    value={name}
                                    required
                                />
                            </div>
                        </div>

                        {/* Username Input (Read-only) */}
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2'>
                                <AtSign className='w-4 h-4 text-gray-400' />
                                Username
                                <span className='text-xs text-gray-400 font-normal'>(Cannot be changed)</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                    <AtSign className='w-5 h-5 text-gray-300' />
                                </div>
                                <input 
                                    type="text" 
                                    className='w-full h-12 pl-12 pr-4 bg-gray-100 border-2 border-gray-200 rounded-xl outline-none text-gray-500 cursor-not-allowed'
                                    readOnly 
                                    value={userData?.userName}
                                />
                            </div>
                        </div>

                        {/* Email Input (Read-only) */}
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2'>
                                <Mail className='w-4 h-4 text-gray-400' />
                                Email Address
                                <span className='text-xs text-gray-400 font-normal'>(Cannot be changed)</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                    <Mail className='w-5 h-5 text-gray-300' />
                                </div>
                                <input 
                                    type="email" 
                                    className='w-full h-12 pl-12 pr-4 bg-gray-100 border-2 border-gray-200 rounded-xl outline-none text-gray-500 cursor-not-allowed'
                                    readOnly 
                                    value={userData?.email}
                                />
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className='bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4'>
                            <div className='flex items-start gap-3'>
                                <CheckCircle2 className='w-5 h-5 text-blue-500 shrink-0 mt-0.5' />
                                <div>
                                    <p className='text-sm font-semibold text-gray-700 mb-1'>Profile Tips</p>
                                    <p className='text-xs text-gray-600 leading-relaxed'>
                                        Use a clear profile picture and your real name to help others recognize you in chats.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button 
                            type='submit'
                            className='w-full h-12 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8 cursor-pointer'
                            disabled={saving}
                        >
                            {saving ? (
                                <div className='flex items-center justify-center gap-2'>
                                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                    <span>Saving changes...</span>
                                </div>
                            ) : (
                                <div className='flex items-center justify-center gap-2'>
                                    <Save className='w-5 h-5' />
                                    <span>Save Profile</span>
                                </div>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <div className='text-center mt-6 text-sm text-gray-500'>
                <p>Your profile information is private and secure</p>
            </div>
        </div>
    </div>
  )
}

export default Profile;
