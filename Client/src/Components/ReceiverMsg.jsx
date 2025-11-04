import React from 'react'
import profilePic from '../assets/profilePic.png';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ReceiverMsg = ({image, message, time}) => {

  let {selectedUser} = useSelector((state) => state.user);
  let scroll = useRef();
  useEffect(() => {
      scroll.current?.scrollIntoView({behavior: 'smooth'});
      
  }, [message, image])
  
  const handleImageScroll = () => {
    scroll.current?.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div className='flex items-end gap-3 py-1'>
      <div className='w-8 h-8 rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md bg-white'>
        <img src={selectedUser.image || profilePic} alt="" className='h-full w-full object-cover' />
      </div>

      <div className='mr-auto flex flex-col items-start max-w-[70%]'>
        <div ref={scroll} className='w-fit max-w-full px-3.5 py-2.5 bg-white text-gray-800 text-[15px] leading-relaxed rounded-2xl rounded-tl-md shadow-lg border border-gray-100 flex flex-col gap-2 mt-1 transform transition-transform duration-150 hover:-translate-y-0.5'>
          {image && <img src={image} alt="" className='max-h-64 w-auto rounded-xl object-cover' onLoad={handleImageScroll}/>}
          {message && <span className='wrap-break-word whitespace-pre-wrap'>{message}</span>}
          {time && (
            <div className='flex items-center gap-1.5 text-xs text-gray-400 justify-end'>
              <span>{time}</span>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default ReceiverMsg
