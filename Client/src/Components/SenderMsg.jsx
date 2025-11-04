import React from 'react'
import profilePic from '../assets/profilePic.png';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BsCheck2, BsCheck2All } from 'react-icons/bs';

const SenderMsg = ({image, message, time, status}) => {

  let {userData} = useSelector((state) => state.user);
  let scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({behavior: 'smooth'});
    
  }, [message, image])

  const handleImageScroll = () => {
    scroll.current?.scrollIntoView({behavior: 'smooth'});
  }

  return (

    <div className='flex items-end gap-3 py-1'>
      <div className='ml-auto flex flex-col items-end max-w-[70%]'>
        <div ref={scroll} className='w-fit max-w-full px-3.5 py-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-[15px] leading-relaxed rounded-2xl rounded-tr-md shadow-lg shadow-blue-500/20 flex flex-col gap-2 mt-1 transform transition-transform duration-150 hover:-translate-y-0.5'>
          {image && <img src={image} alt="" className='max-h-64 w-auto rounded-xl object-cover' onLoad={handleImageScroll}/>}
          {message && <span className='break-words whitespace-pre-wrap'>{message}</span>}
          {(time || status) && (
            <div className='flex items-center gap-1.5 text-xs text-white/80 justify-end'>
              {time && <span>{time}</span>}
              {status === 'seen' ? (
                <BsCheck2All className='text-cyan-200' />
              ) : status === 'delivered' ? (
                <BsCheck2All className='text-white/80' />
              ) : status === 'sent' ? (
                <BsCheck2 className='text-white/80' />
              ) : null}
            </div>
          )}
        </div>
      </div>

      <div className='w-8 h-8 rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md bg-white'>
        <img src={userData.image || profilePic} alt="" className='h-full w-full object-cover' />
      </div>

    </div>
  )
}

export default SenderMsg
