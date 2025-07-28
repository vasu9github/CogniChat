import React from 'react';
import { Send } from 'lucide-react';
import Textarea from 'react-textarea-autosize';

const ChatInterface = () => {
  return (
    <div className='flex flex-col h-full bg-white dark:bg-black'>
      <div className='flex-1 p-6 space-y-6 overflow-y-auto'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-200'>CogniChat</h2>
          <p className='text-gray-500 dark:text-gray-400'>Start a conversation by typing below.</p>
        </div>
      </div>
      <div className='p-4 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800'>
        <div className='relative max-w-4xl mx-auto flex items-end'>
          <Textarea
            minRows={1}
            maxRows={5}
            placeholder='Ask CogniChat anything...'
            className='w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl pl-4 pr-12 py-3 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button className='absolute right-2 bottom-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors'>
            <Send size={20} className='text-white' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;