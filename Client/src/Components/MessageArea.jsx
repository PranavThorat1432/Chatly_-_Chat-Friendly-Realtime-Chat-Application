import React, { useRef, useState } from 'react'
import profilePic from '../assets/profilePic.png';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import { serverUrl } from '../App';
import { setMessages } from '../redux/msgSlice';
import SenderMsg from './SenderMsg';
import ReceiverMsg from './ReceiverMsg';
import { useEffect } from 'react';

const MessageArea = () => {

  const {selectedUser, userData, socket, onlineUsers} = useSelector((state) => state.user);
  const isUserOnline = selectedUser && onlineUsers?.includes(selectedUser._id);
  let dispatch = useDispatch();

  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState('');
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  let image = useRef();
  let {messages} = useSelector((state) => state.message); 


  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };


  const handleSendMsg = async (e) => {
    
    e.preventDefault();

    if(input.length === 0 && !backendImage) {
      return null;
    }

    try {
      let formData = new FormData();
      formData.append('message', input);

      if(backendImage) {
        formData.append('image', backendImage);
      }
      let result = await axios.post(`${serverUrl}/api/msg/send-msg/${selectedUser?._id}`, formData, {
        withCredentials: true
      });

      dispatch(setMessages([...messages, result.data]));

      // Clear input and image after successful send
      setInput('');
      setFrontendImage(null);
      setBackendImage(null);

    } catch (error) {
      console.log(error);
    }
  };

  
  const onEmojiClick = (emojiData) => {
    setInput(prevInput => prevInput + emojiData.emoji);
    setShowPicker(false);
  };

  useEffect(() => {
    socket.on('newMsg', (msg) => {
      dispatch(setMessages([...messages, msg]));
    })

    return () => socket.off('newMsg');
  }, [messages, setMessages]);



  return (
    <div className={`lg:w-[70%] ${selectedUser ? "flex" : 'hidden'} lg:flex w-full h-full bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 relative`}>
      {selectedUser &&
      <div className='flex flex-col w-full h-screen'>
        <div className='w-full h-[90px] bg-linear-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-b-3xl shadow-xl shadow-blue-500/20 flex items-center gap-4 sm:gap-6 px-5 sm:px-7'>
            <button onClick={() => dispatch(setSelectedUser(null))} className='inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition-all cursor-pointer'>
                <FaArrowLeftLong className='w-5 h-5 text-white'/>
            </button>

            <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center ring-2 ring-white/50 shadow-lg bg-white'>
                <img src={selectedUser?.image || profilePic} alt="" className='h-full w-full object-cover' />
            </div>

            <div className='flex flex-col'>
              <h1 className='text-white font-semibold text-[18px] sm:text-[20px] leading-tight'>{selectedUser?.name || 'User'}</h1>
              <span className={`text-xs ${isUserOnline ? 'text-green-200' : 'text-gray-200'}`}>
                {isUserOnline ? 'Online' : 'Offline'}
              </span>
            </div>
        </div>

        <div className='w-full lg:h-[550px] h-[68vh] flex flex-col py-4 px-4 sm:px-8 overflow-auto'>
          {showPicker && 
            <div className='absolute bottom-[120px] left-4 sm:left-8 z-50'>
                <EmojiPicker width={300} height={350} className='shadow-xl' onEmojiClick={onEmojiClick}/>
            </div>
          }

          <div className='flex flex-col gap-1.5'>
            {messages && messages.map((msg) => (
              msg.sender == userData._id 
                ? <SenderMsg key={msg._id || Math.random()} image={msg.image} message={msg.message} /> 
                : <ReceiverMsg key={msg._id || Math.random()} image={msg.image} message={msg.message} />
            ))}
          </div>

        </div>
      </div>
      }

      {!selectedUser && 
        <div className='w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 text-center'>
          <div className='animate-bounce-slow mb-8'>
            <div className='relative'>
              <div className='w-32 h-32 sm:w-40 sm:h-40 bg-linear-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-xl'>
                <svg xmlns="http://www.w3.org/2000/svg" className='h-16 w-16 sm:h-20 sm:w-20 text-white' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className='absolute -bottom-2 -right-2 bg-green-400 rounded-full w-8 h-8 flex items-center justify-center border-4 border-white shadow-md'>
                <span className='text-white text-xs font-bold'>1.0</span>
              </div>
            </div>
          </div>
          
          <h1 className='text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-700 mb-3'>
            Welcome to Chatly
          </h1>
          
          <p className='text-gray-600 text-lg sm:text-xl max-w-md leading-relaxed mb-8'>
            Connect with your friends and start chatting in real-time. Simple, fast, and secure messaging experience.
          </p>
          
          <div className='flex flex-wrap justify-center gap-3'>
            <div className='px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse'></span>
              <span className='text-sm font-medium text-gray-700'>End-to-end encrypted</span>
            </div>
            <div className='px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-blue-400 animate-pulse'></span>
              <span className='text-sm font-medium text-gray-700'>Real-time messaging</span>
            </div>
          </div>
          
          <div className='mt-10 text-sm text-gray-400 flex items-center gap-2'>
            <span>Select a chat to start messaging</span>
            <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4 animate-bounce-x' fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      }

      {selectedUser &&
        <div className='w-full lg:w-[70%] h-[100px] fixed bottom-4 flex items-end justify-center pointer-events-none'>
          {frontendImage && (
            <img src={frontendImage} alt="" className='w-20 rounded-xl shadow-xl border border-white/80 bg-white/80 backdrop-blur-md absolute -top-24 right-6 sm:right-24'/>
          )}

          <form className='pointer-events-auto w-[95%] lg:w-[70%] bg-white/80 backdrop-blur-xl border border-white/50 h-16 rounded-full shadow-xl flex items-center gap-4 px-5' onSubmit={handleSendMsg}>

            <button type='button' onClick={() => setShowPicker(!showPicker)} className='shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/70 transition-colors cursor-pointer'>
              <RiEmojiStickerLine className='w-[22px] h-[22px] text-gray-700'/>
            </button>
            <input type="text" className='w-full h-full px-1 outline-none border-0 text-[16px] sm:text-[17px] text-gray-800 placeholder:text-gray-400 bg-transparent' placeholder='Type a message' onChange={(e) => setInput(e.target.value)} value={input}/>

            <button type='button' onClick={() => image.current.click()} className='shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/70 transition-colors cursor-pointer'>
              <FaImages className='w-[22px] h-[22px] text-gray-700'/>
            </button>
            <input type="file" hidden accept='image/*' ref={image} onChange={handleImage}/>

            <button type='submit' className='shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg cursor-pointer'>
              <IoMdSend className='w-5 h-5' />
            </button>
          </form>
        </div>
      }
        
    </div>
  )
}

export default MessageArea
