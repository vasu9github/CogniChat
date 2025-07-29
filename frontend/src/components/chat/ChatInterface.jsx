// import React, { useState, useEffect, useRef } from 'react';
// import { Send } from 'lucide-react';
// import Textarea from 'react-textarea-autosize';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';

// const ChatInterface = ({ selectedChatId, setSelectedChatId, setChats }) => {
//   const { user } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!selectedChatId) {
//         setMessages([]);
//         return;
//       }
//       setLoading(true);
//       try {
//         const res = await axios.get(`https://cognichat-backend.onrender.com/api/chats/${selectedChatId}`, { withCredentials: true });
//         setMessages(res.data.messages);
//       } catch (error) {
//         setMessages([{ role: 'model', content: 'Failed to load this conversation.' }]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMessages();
//   }, [selectedChatId]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || !user) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       const response = await axios.post('https://cognichat-backend.onrender.com/api/chats/generate', {
//         prompt: input,
//         chatId: selectedChatId
//       }, {
//         withCredentials: true,
//       });

//       const aiMessage = { role: 'model', content: response.data.aiResponse };
//       setMessages(prev => [...prev, aiMessage]);

//       if (!selectedChatId) {
//         setSelectedChatId(response.data.chat._id);

//         setChats(prevChats => [response.data.chat, ...prevChats]);
//       }
//     } catch (error) {
//       const errorMessage = { role: 'model', content: "Sorry, I couldn't get a response. Please try again." };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//       inputRef.current?.focus();
//     }
//   };

//   return (
//     <div className='flex flex-col flex-1 min-h-0 bg-black'>
//       <div className='flex-1 p-6 space-y-4 overflow-y-auto'>
//         {messages.length === 0 && !loading ? (
//           <div className='text-center h-full flex flex-col items-center justify-center'>
//             <img width={66} height={66} src="/logo.png" alt="CogniChat Logo" />
//             <h2 className='text-3xl m-2 font-bold text-gray-200'>CogniChat</h2>
//             <p className='text-gray-400'>Start a conversation by typing below.</p>
//           </div>
//         ) : (
//           messages.map((msg, index) => (
//             <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//               <div className={`rounded-lg p-3 max-w-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-100'}`}>
//                 <p className="break-words">{msg.content}</p>
//               </div>
//             </div>
//           ))
//         )}
//         {loading && (
//           <div className='flex justify-start'>
//             <div className='bg-gray-800 rounded-lg p-3'>
//               <div className='flex items-center space-x-2'>
//                 <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce'></div>
//                 <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150'></div>
//                 <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300'></div>
//               </div>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className='p-4 bg-black border-t border-gray-800'>
//         <form onSubmit={handleSendMessage} className='relative max-w-4xl mx-auto flex items-end'>
//           <Textarea
//             ref={inputRef}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSendMessage(e);
//               }
//             }}
//             minRows={1}
//             maxRows={5}
//             placeholder='Ask CogniChat anything...'
//             className='w-full bg-gray-900 border border-gray-700 rounded-2xl pl-4 pr-12 py-3 text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
//             disabled={!user || loading}
//           />
//           <button type="submit" disabled={!user || loading} className='absolute right-2 bottom-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors disabled:bg-gray-500'>
//             <Send size={20} className='text-white' />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;

import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import Textarea from 'react-textarea-autosize';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = 'https://cognichat-backend.onrender.com';

const ChatInterface = ({ selectedChatId, setSelectedChatId, setChats }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChatId) {
        setMessages([]);
        return;
      }
      setLoading(true);
      try {
        // FIX: Added the correct '/api/chats/:selectedChatId' path
        const res = await axios.get(`${API_BASE_URL}/api/chats/${selectedChatId}`, { withCredentials: true });
        setMessages(res.data.messages);
      } catch (error) {
        console.error("Failed to fetch messages", error);
        setMessages([{ role: 'model', content: 'Failed to load this conversation.' }]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [selectedChatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // FIX: Added the correct '/api/chats/generate' path
      const response = await axios.post(`${API_BASE_URL}/api/chats/generate`, {
        prompt: input,
        chatId: selectedChatId
      }, {
        withCredentials: true,
      });

      const aiMessage = { role: 'model', content: response.data.aiResponse };
      setMessages(prev => [...prev, aiMessage]);

      if (!selectedChatId) {
        const newChat = { _id: response.data.chat._id, title: response.data.chat.title };
        setSelectedChatId(newChat._id);
        setChats(prevChats => [newChat, ...prevChats]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { role: 'model', content: "Sorry, I couldn't get a response. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className='flex flex-col flex-1 min-h-0 bg-black'>
      <div className='flex-1 p-6 space-y-4 overflow-y-auto'>
        {messages.length === 0 && !loading ? (
          <div className='text-center h-full flex flex-col items-center justify-center'>
            <img width={66} height={66} src="/logo.png" alt="CogniChat Logo" />
            <h2 className='text-3xl m-2 font-bold text-gray-200'>CogniChat</h2>
            <p className='text-gray-400'>Start a conversation by typing below.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg p-3 max-w-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-100'}`}>
                <p className="break-words">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className='flex justify-start'>
            <div className='bg-gray-800 rounded-lg p-3'>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce'></div>
                <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150'></div>
                <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300'></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className='p-4 bg-black border-t border-gray-800'>
        <form onSubmit={handleSendMessage} className='relative max-w-4xl mx-auto flex items-end'>
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            minRows={1}
            maxRows={5}
            placeholder='Ask CogniChat anything...'
            className='w-full bg-gray-900 border border-gray-700 rounded-2xl pl-4 pr-12 py-3 text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
            disabled={!user || loading}
          />
          <button type="submit" disabled={!user || loading} className='absolute right-2 bottom-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors disabled:bg-gray-500'>
            <Send size={20} className='text-white' />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
