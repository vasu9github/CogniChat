import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import Textarea from 'react-textarea-autosize';
import { useAuth } from '../../context/AuthContext';

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
        const res = await fetch(`https://cognichat-backend.onrender.com/api/chats/${selectedChatId}`, { credentials: 'include' });
        const data = await res.json();
        setMessages(data.messages);
      } catch (error) {
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

   
    const aiMessagePlaceholder = { role: 'model', content: "" };
    setMessages(prev => [...prev, aiMessagePlaceholder]);

    try {
      const response = await fetch('https://cognichat-backend.onrender.com/api/chats/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          chatId: selectedChatId
        }),
        credentials: 'include',
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n\n');
        
        lines.forEach(line => {
          if (line.startsWith('data:')) {
            const data = JSON.parse(line.substring(5));
            if (data.text) {
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content += data.text;
                return newMessages;
              });
            }
            if (data.newChat) {
                setSelectedChatId(data.newChat._id);
                setChats(prevChats => [data.newChat, ...prevChats]);
            }
          }
        });
      }

    } catch (error) {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = "Sorry, I couldn't get a response. Please try again.";
        return newMessages;
      });
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
                <p className="break-words whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
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
