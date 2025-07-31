import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ChatInterface from '../components/chat/ChatInterface';
import { Toaster } from 'react-hot-toast'

const HomePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const startNewChat = () => setSelectedChatId(null);

  return (
    <div className='flex h-dvh bg-black text-white'>
      <Toaster position="top-center" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />
      
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setSelectedChatId={setSelectedChatId}
        startNewChat={startNewChat}
        chats={chats}
        setChats={setChats}
      />
      <div className='flex-1 flex flex-col min-w-0'>
        <Navbar toggleSidebar={toggleSidebar} />
        <ChatInterface
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
          setChats={setChats}
        />
      </div>
    </div>
  );
};

export default HomePage;
