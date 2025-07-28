import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ChatInterface from '../components/chat/ChatInterface';

const HomePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='relative h-screen bg-white dark:bg-black overflow-hidden'>
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex flex-col h-full transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <main className='flex-1 flex flex-col pt-16'>
          <ChatInterface />
        </main>
      </div>
    </div>
  );
};

export default HomePage;