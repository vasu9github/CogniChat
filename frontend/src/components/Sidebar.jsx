// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { MessageSquare, Plus, Search, Trash2, User, X } from "lucide-react";
// import axios from "axios";

// const Sidebar = ({ isOpen, toggleSidebar, setSelectedChatId, startNewChat, chats, setChats }) => {
//   const { user } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchChats = async () => {
//       if (user) {
//         try {
//           const res = await axios.get('https://cognichat-backend.onrender.com/api/chats', { withCredentials: true });
//           setChats(res.data);
//         } catch (err) {
//           console.error('Error fetching chats:', err);
//         }
//       }
//     };

//     fetchChats();
//   }, [user, setChats]);

//   const handleDelete = async (e, chatId) => {
//     e.stopPropagation();
//     if (!window.confirm('Are you sure you want to delete this chat?')) return;

//     try {
//       await axios.delete(`https://cognichat-backend.onrender.com/api/chats/${chatId}`, {
//         withCredentials: true,
//       });
//       setChats((prev) => prev.filter((chat) => chat._id !== chatId));
//       startNewChat();
//     } catch (err) {
//       console.error('Delete failed:', err);
//     }
//   };

//   const filteredChats = chats.filter((chat) =>
//     (chat.title || '').toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       {isOpen && <div onClick={toggleSidebar} className='fixed inset-0 bg-black/60 z-50 md:hidden'></div>}
//       <aside className={`fixed md:relative bg-black h-full border-r border-gray-700 transition-all z-40 md:z-0 overflow-hidden
//         ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:translate-x-0'}`}>
//         <div className='w-64 h-full flex flex-col'>
//           <div className='p-4 border-b border-gray-700'>
//             <div className='flex justify-between items-center mb-4'>
//               <h2 className='text-white text-xl font-bold'>History</h2>
//               <div className='flex gap-2'>
//                 <button onClick={startNewChat} className='p-2 hover:bg-gray-700 rounded-md'>
//                   <Plus size={20} color='white' />
//                 </button>
//                 <button onClick={toggleSidebar} className='p-2 hover:bg-gray-700 md:hidden rounded-md'>
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
//               filteredChats.map((chat) => (
//                 <div key={chat._id} className='group flex items-center relative'>
//                   <button
//                     onClick={() => setSelectedChatId(chat._id)}
//                     className='flex-1 text-left p-2 rounded-md hover:bg-gray-700 flex items-center gap-2'
//                   >
//                     <MessageSquare size={16} />
//                     <span className='truncate'>{chat.title || 'Untitled Chat'}</span>
//                   </button>
//                   <button
//                     onClick={(e) => handleDelete(e, chat._id)}
//                     className='p-1 text-gray-400 hover:text-white hover:bg-red-500 rounded-md opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity'
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className='text-gray-400 text-sm px-2'>No chats found.</p>
//             )}
//           </div>

//           {user && (
//             <div className='p-4 border-t border-gray-700'>
//               <div className='flex items-center gap-3'>
//                 <div className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden'>
//                   {user.profilePicture ? (
//                     <img src={user.profilePicture} alt={user.fullName} className='h-full w-full object-cover' />
//                   ) : (
//                     <User size={20} color='white' />
//                   )}
//                 </div>
//                 <div>
//                   <p className='text-white font-semibold text-sm'>{user.fullName}</p>
//                   <p className='text-gray-400 text-xs'>{user.email}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

// src/components/Sidebar.jsx

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { MessageSquare, Plus, Search, Trash2, User, X } from "lucide-react";
import axios from "axios";

const Sidebar = ({ isOpen, toggleSidebar, setSelectedChatId, startNewChat, chats, setChats }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // This logic can remain the same
  useEffect(() => {
    const fetchChats = async () => {
      if (user) {
        try {
          const res = await axios.get('https://cognichat-backend.onrender.com/api/chats', { withCredentials: true });
          setChats(res.data);
        } catch (err) {
          console.error('Error fetching chats:', err);
        }
      }
    };
    fetchChats();
  }, [user, setChats]);

  const handleDelete = async (e, chatId) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this chat?')) return;
    try {
      await axios.delete(`https://cognichat-backend.onrender.com/api/chats/${chatId}`, { withCredentials: true });
      setChats((prev) => prev.filter((chat) => chat._id !== chatId));
      startNewChat();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const filteredChats = chats.filter((chat) =>
    (chat.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* --- FIX: Overlay z-index is now z-30 (below the sidebar) --- */}
      {isOpen && <div onClick={toggleSidebar} className='fixed inset-0 bg-black/60 z-30 md:hidden'></div>}
      
      {/* --- FIX: Sidebar z-index is z-40 (highest) --- */}
      <aside className={`fixed md:relative bg-black h-full border-r border-gray-700 transition-all z-40 overflow-hidden
        ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:translate-x-0'}`}>
        
        {/* The rest of your sidebar code is perfect and doesn't need changes */}
        <div className='w-64 h-full flex flex-col'>
          <div className='p-4 border-b border-gray-700'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-white text-xl font-bold'>History</h2>
              <div className='flex gap-2'>
                <button onClick={startNewChat} className='p-2 hover:bg-gray-700 rounded-md'>
                  <Plus size={20} color='white' />
                </button>
                <button onClick={toggleSidebar} className='p-2 hover:bg-gray-700 md:hidden rounded-md'>
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
            {filteredChats.map((chat) => (
              <div key={chat._id} className='group flex items-center relative'>
                <button
                  onClick={() => setSelectedChatId(chat._id)}
                  className='flex-1 text-left p-2 rounded-md hover:bg-gray-700 flex items-center gap-2'
                >
                  <MessageSquare size={16} />
                  <span className='truncate'>{chat.title || 'Untitled Chat'}</span>
                </button>
                <button
                  onClick={(e) => handleDelete(e, chat._id)}
                  className='p-1 text-gray-400 hover:text-white hover:bg-red-500 rounded-md opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          {user && (
            <div className='p-4 border-t border-gray-700'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden'>
                  {user.profilePicture ? (
                    <img src={user.profilePicture} alt={user.fullName} className='h-full w-full object-cover' />
                  ) : (
                    <User size={20} color='white' />
                  )}
                </div>
                <div>
                  <p className='text-white font-semibold text-sm'>{user.fullName}</p>
                  <p className='text-gray-400 text-xs'>{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;