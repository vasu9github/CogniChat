
// import React, { useState, useEffect } from 'react';
// import { Search, Plus, User, MessageSquare, Trash2, X } from 'lucide-react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = ({ isOpen, toggleSidebar, setSelectedChatId, startNewChat, chats, setChats }) => {
//   const { user } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchChats = async () => {
//       if (user) {
//         try {
//           const res = await axios.get('https://cognichat-backend.onrender.com/api/chats', { withCredentials: true });
//           setChats(res.data);
//         } catch (error) {
//           console.error("Failed to fetch chats", error);
//         }
//       }
//     };
//     fetchChats();
//   }, [user, setChats]);

//   const handleDelete = async (e, chatId) => {
//     e.stopPropagation();
//     if (window.confirm("Are you sure you want to delete this chat?")) {
//         try {
//             await axios.delete(`https://cognichat-backend.onrender.com/api/chats/${chatId}`, { withCredentials: true });
//             setChats(chats.filter(chat => chat._id !== chatId));
//             startNewChat();
//         } catch (error) {
//             console.error("Failed to delete chat", error);
//         }
//     }
//   };

//   const filteredChats = chats.filter(chat => 
//     chat.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       {isOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black/60 z-10 md:hidden"></div>}

//       <aside
//         className={`fixed top-0 left-0 z-20 flex flex-col bg-black h-full border-r border-gray-700 transition-transform duration-300 ease-in-out
//                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <div className="w-64 h-full flex flex-col">
//           <div className='p-4 border-b border-gray-700'>
//             <div className='flex items-center justify-between mb-4'>
//               <h1 className='text-xl font-sans text-white'>History</h1>
//               <div className="flex items-center gap-2">
//                 <button onClick={startNewChat} className='p-2 rounded-md hover:bg-gray-700 transition-colors'>
//                   <Plus size={20} color='white' />
//                 </button>
//                 <button onClick={toggleSidebar} className='p-2 rounded-md hover:bg-gray-700 transition-colors md:hidden'>
//                   <X size={20} color='white' />
//                 </button>
//               </div>
//             </div>
//             <div className='relative'>
//               <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
//               <input
//                 type='text'
//                 placeholder='Search history...'
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className='w-full bg-gray-800 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
//               />
//             </div>
//           </div>
          
//           <div className='flex-1 p-2 overflow-y-auto'>
//             {filteredChats.length > 0 ? (
//               filteredChats.map(chat => (
//                 <div key={chat._id} className="group relative">
//                     <button 
//                     onClick={() => setSelectedChatId(chat._id)}
//                     className="w-full text-left p-2 rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2"
//                     >
//                     <MessageSquare size={16} />
//                     <span className="truncate">{chat.title}</span>
//                     </button>
//                     <button onClick={(e) => handleDelete(e, chat._id)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-white hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <Trash2 size={14} />
//                     </button>
//                 </div>
//               ))
//             ) : (
//               <p className='text-gray-400 text-sm px-2'>No chats found.</p>
//             )}
//           </div>

//           <div className='p-4 border-t border-gray-700'>
//             {user && (
//               <div className='flex items-center gap-3'>
//                 <div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden'>
//                   {user.profilePicture ? (
//                       <img src={user.profilePicture} alt={user.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                       <User size={20} color='white' />
//                   )}
//                 </div>
//                 <div>
//                   <p className='text-sm font-semibold text-white'>{user.fullName}</p>
//                   <p className='text-xs text-gray-400'>{user.email}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from 'react';
// import { Search, Plus, User, MessageSquare, Trash2, X } from 'lucide-react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = ({ isOpen, toggleSidebar, setSelectedChatId, startNewChat, chats, setChats }) => {
//   const { user } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchChats = async () => {
//       if (user) {
//         try {
//           const res = await axios.get('https://cognichat-backend.onrender.com/api/chats', { withCredentials: true });
//           setChats(res.data);
//         } catch (error) {
//           console.error("Failed to fetch chats", error);
//         }
//       }
//     };
//     fetchChats();
//   }, [user, setChats]);

//   const handleDelete = async (e, chatId) => {
//     e.stopPropagation();
//     if (window.confirm("Are you sure you want to delete this chat?")) {
//         try {
//             await axios.delete(`https://cognichat-backend.onrender.com/api/chats/${chatId}`, { withCredentials: true });
//             setChats(chats.filter(chat => chat._id !== chatId));
//             startNewChat();
//         } catch (error) {
//             console.error("Failed to delete chat", error);
//         }
//     }
//   };

//   const filteredChats = chats.filter(chat => 
//     chat.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       {isOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black/60 z-10 md:hidden"></div>}

//       <aside
//         // ✨ FIX: Added 'overflow-hidden' to the main container.
//         // This will clip and hide any content that overflows when the width is zero.
//         className={`flex-shrink-0 bg-black h-full border-r border-gray-700 transition-all duration-300 ease-in-out overflow-hidden
//                    ${isOpen ? 'w-64' : 'w-0 border-r-0'}`}
//       >
//         <div className="w-64 h-full flex flex-col">
//           <div className='p-4 border-b border-gray-700'>
//             <div className='flex items-center justify-between mb-4'>
//               <h1 className='text-xl font-sans text-white'>History</h1>
//               <div className="flex items-center gap-2">
//                 <button onClick={startNewChat} className='p-2 rounded-md hover:bg-gray-700 transition-colors'>
//                   <Plus size={20} color='white' />
//                 </button>
//                 <button onClick={toggleSidebar} className='p-2 rounded-md hover:bg-gray-700 transition-colors md:hidden'>
//                   <X size={20} color='white' />
//                 </button>
//               </div>
//             </div>
//             <div className='relative'>
//               <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
//               <input
//                 type='text'
//                 placeholder='Search history...'
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className='w-full bg-gray-800 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
//               />
//             </div>
//           </div>
          
//           <div className='flex-1 p-2 overflow-y-auto'>
//             {filteredChats.length > 0 ? (
//               filteredChats.map(chat => (
//                 <div key={chat._id} className="group relative">
//                     <button 
//                     onClick={() => setSelectedChatId(chat._id)}
//                     className="w-full text-left p-2 rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2"
//                     >
//                     <MessageSquare size={16} />
//                     <span className="truncate">{chat.title}</span>
//                     </button>
//                     <button onClick={(e) => handleDelete(e, chat._id)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-white hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <Trash2 size={14} />
//                     </button>
//                 </div>
//               ))
//             ) : (
//               <p className='text-gray-400 text-sm px-2'>No chats found.</p>
//             )}
//           </div>

//           <div className='p-4 border-t border-gray-700'>
//             {user && (
//               <div className='flex items-center gap-3'>
//                 <div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden'>
//                   {user.profilePicture ? (
//                       <img src={user.profilePicture} alt={user.fullName} className="h-full w-full object-cover" />
//                   ) : (
//                       <User size={20} color='white' />
//                   )}
//                 </div>
//                 <div>
//                   <p className='text-sm font-semibold text-white'>{user.fullName}</p>
//                   <p className='text-xs text-gray-400'>{user.email}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;


import { Search, Plus, User, MessageSquare, Trash2, X } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';

const Sidebar = ({ isOpen, toggleSidebar, setSelectedChatId, startNewChat, chats, setChats }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      if (user) {
        try {
          const res = await axios.get('https://cognichat-backend.onrender.com/api/chats', { withCredentials: true });
          setChats(res.data);
        } catch (error) {
          console.error("Failed to fetch chats", error);
        }
      }
    };
    fetchChats();
  }, [user, setChats]);

  const handleDelete = async (e, chatId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this chat?")) {
        try {
            await axios.delete(`https://cognichat-backend.onrender.com/api/chats/${chatId}`, { withCredentials: true });
            setChats(chats.filter(chat => chat._id !== chatId));
            startNewChat();
        } catch (error) {
            console.error("Failed to delete chat", error);
        }
    }
  };

  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Overlay for mobile view, appears when sidebar is open */}
      {isOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black/60 z-30 md:hidden"></div>}

      <aside
        // ✨ FIX: Added 'pointer-events-none' when closed to allow clicks to pass through.
        // The z-index is also adjusted to prevent stacking issues.
        className={`fixed md:relative flex-shrink-0 bg-black h-full border-r border-gray-700 transition-all duration-300 ease-in-out
                   transform md:transform-none
                   ${isOpen ? 'w-64 translate-x-0 z-20' : 'w-0 md:w-0 border-r-0 -translate-x-full md:translate-x-0 z-0 pointer-events-none'}`}
      >
        <div className="w-64 h-full flex flex-col overflow-hidden">
          <div className='p-4 border-b border-gray-700'>
            <div className='flex items-center justify-between mb-4'>
              <h1 className='text-xl font-sans text-white'>History</h1>
              <div className="flex items-center gap-2">
                <button onClick={startNewChat} className='p-2 rounded-md hover:bg-gray-700 transition-colors'>
                  <Plus size={20} color='white' />
                </button>
                <button onClick={toggleSidebar} className='p-2 rounded-md hover:bg-gray-700 transition-colors md:hidden'>
                  <X size={20} color='white' />
                </button>
              </div>
            </div>
            <div className='relative'>
              <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Search history...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full bg-gray-800 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>
          
          <div className='flex-1 p-2 overflow-y-auto'>
            {filteredChats.length > 0 ? (
              filteredChats.map(chat => (
                <div key={chat._id} className="group relative flex items-center">
                    <button 
                    onClick={() => setSelectedChatId(chat._id)}
                    className="flex-1 text-left p-2 rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                    <MessageSquare size={16} />
                    <span className="truncate">{chat.title}</span>
                    </button>
                    <button onClick={(e) => handleDelete(e, chat._id)} className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-red-500 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={14} />
                    </button>
                </div>
              ))
            ) : (
              <p className='text-gray-400 text-sm px-2'>No chats found.</p>
            )}
          </div>

          <div className='p-4 border-t border-gray-700'>
            {user && (
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden'>
                  {user.profilePicture ? (
                      <img src={user.profilePicture} alt={user.fullName} className="h-full w-full object-cover" />
                  ) : (
                      <User size={20} color='white' />
                  )}
                </div>
                <div>
                  <p className='text-sm font-semibold text-white'>{user.fullName}</p>
                  <p className='text-xs text-gray-400'>{user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

