import React from 'react';
import { Search, Plus, User } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`absolute z-10 flex flex-col w-64 bg-black h-screen pt-20 border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className='p-4 border-b border-gray-700'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-xl font-sans text-white'>History</h1>
          <button className='p-2 rounded-md hover:bg-gray-700 transition-colors'>
            <Plus size={20} color='white' />
          </button>
        </div>
        <div className='relative'>
          <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search history...'
            className='w-full bg-gray-800 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>
      <div className='flex-1 px-4 py-2 overflow-y-auto'>
        <p className='text-gray-400 text-sm'>No chats yet.</p>
      </div>
      <div className='p-4 border-t border-gray-700 mt-auto'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center'>
            <User size={20} color='white' />
          </div>
          <div>
            <p className='text-sm font-semibold text-white'>Your Name</p>
            <p className='text-xs text-gray-400'>your.email@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;