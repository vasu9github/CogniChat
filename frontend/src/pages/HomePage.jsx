import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ChatInterface from '../components/chat/ChatInterface';

const HomePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='flex h-screen bg-black text-white'>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className='flex-1 flex flex-col min-w-0'>
        <Navbar toggleSidebar={toggleSidebar} />
        <ChatInterface />
      </div>
    </div>
  );
};

export default HomePage;