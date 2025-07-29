import React from 'react';
import { Search, Plus, User, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {isOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black/60 z-10 md:hidden"></div>}

      <aside
        className={`fixed md:relative z-20 flex flex-col bg-black h-full border-r border-gray-700 transition-all duration-300 ease-in-out
                   ${isOpen ? 'w-64' : 'w-0 border-0 pointer-events-none'}`}
      >
        <div className={`w-64 h-full flex flex-col overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className='p-4 border-b border-gray-700'>
            <div className='flex items-center justify-between mb-4'>
              <h1 className='text-xl font-sans text-white'>History</h1>
              <div className="flex items-center gap-2">
                <button className='p-2 rounded-md hover:bg-gray-700 transition-colors'>
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
                className='w-full bg-gray-800 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>
          <div className='flex-1 p-2 overflow-y-auto'>
          </div>
          <div className='p-4 border-t border-gray-700'>
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
        </div>
      </aside>
    </>
  );
};

export default Sidebar;