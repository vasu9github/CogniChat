// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import ChatInterface from '../components/chat/ChatInterface';

// const HomePage = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [selectedChatId, setSelectedChatId] = useState(null);
//   const [chats, setChats] = useState([]);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   const startNewChat = () => {
//     setSelectedChatId(null);
//   };

//   return (
//     <div className='bg-black h-screen'>
//       <Sidebar 
//         isOpen={isSidebarOpen} 
//         toggleSidebar={toggleSidebar} 
//         setSelectedChatId={setSelectedChatId}
//         startNewChat={startNewChat}
//         chats={chats}
//         setChats={setChats}
//       />
//       <main className={`flex flex-col h-full transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
//         <Navbar toggleSidebar={toggleSidebar} />
//         <ChatInterface 
//           selectedChatId={selectedChatId} 
//           setSelectedChatId={setSelectedChatId}
//           setChats={setChats}
//         />
//       </main>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ChatInterface from '../components/chat/ChatInterface';

const HomePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]); 

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const startNewChat = () => {
    setSelectedChatId(null);
  };

  return (
    <div className='flex h-dvh bg-black text-white'>
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
