import React from 'react'
import Sidebar from '../Components/Sidebar'
import MessageArea from '../Components/MessageArea'
import getMessages from '../customHooks/getMessages'

const Home = () => {

  getMessages();
  
  return (
    <div className='w-full h-screen flex overflow-hidden'>
      <Sidebar/>

      <MessageArea/>
    </div>
  )
}

export default Home
