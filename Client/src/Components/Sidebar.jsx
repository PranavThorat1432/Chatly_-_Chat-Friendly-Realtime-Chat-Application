import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiX, 
  FiLogOut, 
  FiUser, 
  FiMessageSquare,
  FiChevronRight
} from 'react-icons/fi';
import profilePic from '../assets/profilePic.png';


const Sidebar = () => {
    const { userData, otherUsers, selectedUser, onlineUsers, searchData } = useSelector((state) => state.user);
    const [search, setSearch] = useState(false);
    const [input, setInput] = useState("");
    const [isHovered, setIsHovered] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        }
    };

    const handleLogout = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logout`, {
                withCredentials: true
            });
            dispatch(setUserData(null));
            dispatch(setOtherUsers(null));
            navigate('/login');

        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/user/search-user?query=${input}`, {
                withCredentials: true
            });

            dispatch(setSearchData(result.data));
            console.log(result.data)
            

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(input) {
            handleSearch();
        }

    }, [input])


    return (
        <div className={`lg:w-[30%] w-full h-screen overflow-hidden bg-linear-to-b from-white to-blue-50 lg:border-r border-gray-100 lg:block relative ${!selectedUser ? "block" : 'hidden'}`}>
            {/* Search Overlay */}
            <AnimatePresence>
                {input && searchData?.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className='absolute top-24 left-0 right-0 mx-4 bg-white rounded-xl shadow-2xl z-50 overflow-hidden'
                    >
                        <div className='max-h-[400px] overflow-y-auto'>
                            {searchData.map((user) => (
                                <motion.div 
                                    key={user._id}
                                    variants={itemVariants}
                                    className='px-4 py-3 hover:bg-blue-50 transition-colors cursor-pointer flex items-center gap-3 border-b border-gray-100 last:border-0'
                                    onClick={() => {
                                        dispatch(setSelectedUser(user)); 
                                        setInput(''); 
                                        setSearch(false);
                                    }}
                                >
                                    <div className='relative'>
                                        <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm'>
                                            <img 
                                                src={user?.image || profilePic} 
                                                alt={user.name || 'User'} 
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                        <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${onlineUsers?.includes(user?._id) ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <h3 className='font-medium text-gray-800 truncate'>{user.name || user.userName}</h3>
                                        <p className='text-sm text-gray-500 truncate'>{onlineUsers?.includes(user?._id) ? 'Online' : 'Offline'}</p>
                                    </div>
                                    <FiChevronRight className='text-gray-400' />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className='w-full bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-8 rounded-b-3xl shadow-lg'>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-2xl font-bold text-white'>Chatly</h1>
                    <div 
                        className='relative group cursor-pointer'
                        onClick={() => navigate('/profile')}
                        onMouseEnter={() => setIsHovered('profile')}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-white/80 shadow-lg transition-transform hover:scale-105'>
                            <img 
                                src={userData.image || profilePic} 
                                alt={userData.name || 'User'} 
                                className='w-full h-full object-cover'
                            />
                        </div>
                        {isHovered === 'profile' && (
                            <div className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity'>
                                View Profile
                            </div>
                        )}
                    </div>
                </div>

                <div className='mb-6'>
                    <h2 className='text-2xl font-bold text-white mb-1'>
                        Hi, <span className='text-blue-100'>{userData.name?.split(' ')[0] || 'User'}</span>
                    </h2>
                    <p className='text-blue-100 text-sm'>Welcome back to Chatly</p>
                </div>

                {/* Search Bar */}
                <div className='relative'>
                    {!search ? (
                        <div 
                            className='flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full cursor-pointer transition-all hover:bg-white/30 mx-auto'
                            onClick={() => setSearch(true)}
                        >
                            <FiSearch className='w-5 h-5 text-white' />
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className='relative w-full'
                        >
                            <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                            <input
                                type='text'
                                placeholder='Search contacts...'
                                className='w-full bg-white/90 backdrop-blur-sm pl-12 pr-10 py-3 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-md'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                autoFocus
                            />
                            <button 
                                className='absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors'
                                onClick={() => {
                                    setSearch(false);
                                    setInput('');
                                }}
                            >
                                <FiX className='w-5 h-5 text-gray-500' />
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Online Users */}
            {!search && otherUsers?.filter(user => onlineUsers?.includes(user._id)).length > 0 && (
                <div className='px-4 py-3'>
                    <div className='flex items-center justify-between mb-3 px-2'>
                        <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Online Now</h3>
                        <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
                            {otherUsers.filter(user => onlineUsers?.includes(user._id)).length} online
                        </span>
                    </div>
                    <div className='flex gap-3 overflow-x-auto pb-3 scrollbar-hide px-2'>
                        {otherUsers?.map((user) => (
                            onlineUsers?.includes(user._id) && (
                                <motion.div
                                    key={user._id}
                                    className='flex flex-col items-center cursor-pointer group'
                                    onClick={() => dispatch(setSelectedUser(user))}
                                    whileHover={{ y: -2 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <div className='relative'>
                                        <div className='w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md group-hover:border-blue-300 transition-colors'>
                                            <img 
                                                src={user?.image || profilePic} 
                                                alt={user.name || 'User'} 
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                        <span className='absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white'></span>
                                    </div>
                                    <span className='mt-2 text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors truncate max-w-[70px]'>
                                        {user.name?.split(' ')[0] || 'User'}
                                    </span>
                                </motion.div>
                            )
                        ))}
                    </div>
                </div>
            )}

            {/* Chat List */}
            <div className='px-4 py-3 h-[calc(100vh-310px)] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent'>
                <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2'>Recent Chats</h3>
                <motion.div 
                    className='space-y-2'
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {otherUsers?.length > 0 ? (
                        otherUsers.map((user) => (
                            <motion.div
                                key={user._id}
                                variants={itemVariants}
                                className={`relative flex items-center p-3 rounded-xl cursor-pointer transition-all ${selectedUser?._id === user._id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                onClick={() => dispatch(setSelectedUser(user))}
                                whileHover={{ x: 5 }}
                            >
                                <div className='relative mr-3'>
                                    <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm'>
                                        <img 
                                            src={user?.image || profilePic} 
                                            alt={user.name || 'User'} 
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                    {onlineUsers?.includes(user?._id) && (
                                        <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white'></span>
                                    )}
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <div className='flex items-center justify-between'>
                                        <h3 className='font-medium text-gray-800 truncate'>{user.name || user.userName}</h3>
                                        {user.lastMessage && (
                                            <span className='text-xs text-gray-400'>
                                                {new Date(user.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        )}
                                    </div>
                                    <p className='text-sm text-gray-500 truncate flex items-center'>
                                        {onlineUsers?.includes(user?._id) ? (
                                            <>
                                                <span className='w-2 h-2 bg-green-400 rounded-full mr-2'></span>
                                                <span>Online</span>
                                            </>
                                        ) : (
                                            <span>Offline</span>
                                        )}
                                    </p>
                                </div>
                                {user.unreadCount > 0 && (
                                    <span className='absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center'>
                                        {user.unreadCount}
                                    </span>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <motion.div 
                            className='flex flex-col items-center justify-center py-10 text-center px-4'
                            variants={itemVariants}
                        >
                            <div className='w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3'>
                                <FiMessageSquare className='w-8 h-8 text-blue-400' />
                            </div>
                            <h3 className='text-gray-700 font-medium mb-1'>No conversations yet</h3>
                            <p className='text-gray-500 text-sm max-w-xs'>Start a new conversation by searching for users above</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Logout Button */}
            <div 
                className='absolute bottom-6 left-6 group'
                onMouseEnter={() => setIsHovered('logout')}
                onMouseLeave={() => setIsHovered(null)}
            >
                <motion.button
                    onClick={handleLogout}
                    className='w-12 h-12 cursor-pointer rounded-full bg-linear-to-r from-red-400 to-red-500 shadow-lg flex items-center justify-center text-white transition-all hover:shadow-xl hover:scale-105'
                    whileHover={{ rotate: 180 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FiLogOut className='w-5 h-5 ' />
                </motion.button>
                {isHovered === 'logout' && (
                    <div className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity'>
                        Logout
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar
