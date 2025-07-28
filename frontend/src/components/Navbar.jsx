import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav 
      className={`fixed top-0 bg-black/30 backdrop-blur-md z-10 transition-all duration-300 
                 ${isSidebarOpen ? 'left-0 md:left-64 w-full md:w-[calc(100%-16rem)]' : 'left-0 w-full'}`}
    >
      <div className='flex items-center justify-between md:px-10 px-6 py-2 border-b border-gray-700'>
        <div className='flex items-center gap-4'>
          <button onClick={toggleSidebar} className='p-2 rounded-full hover:bg-white/20'>
            <Menu size={20} className='text-white' />
          </button>
          <h1 className='text-md font-inter font-semibold text-white'>CogniChat</h1>
        </div>

        <div className='flex items-center'>
          <button className='bg-white px-2 py-1 text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors duration-300'>
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;