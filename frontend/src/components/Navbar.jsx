import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { user, loading } = useAuth();

  // Function to get initials from a name
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    // Handle cases where there might be only one name
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

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
          {loading ? (
            <div className='h-8 w-8 bg-gray-700 rounded-full animate-pulse'></div>
          ) : user ? (
            // ✨ FIX: Custom Avatar Component
            <div className='h-8 w-8 rounded-full flex items-center justify-center bg-gray-600 overflow-hidden'>
              {user.profilePicture ? (
                <img src={user.profilePicture} alt={user.fullName} className='h-full w-full object-cover' />
              ) : (
                <span className='font-semibold text-white text-xs'>{getInitials(user.fullName)}</span>
              )}
            </div>
          ) : (
            <a href='http://localhost:3000/auth/google' className='bg-white px-2 py-1 text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors duration-300'>
              Sign Up
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;