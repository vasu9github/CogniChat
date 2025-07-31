import React, { useState, useEffect, useRef } from 'react';
import { Menu, LogOut } from 'lucide-react'; 
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar }) => {
  const { user, loading , logout } = useAuth();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className='sticky top-0 bg-black/50 backdrop-blur-sm z-20 border-b border-gray-700'>
      <div className='flex items-center justify-between md:px-10 px-6 py-2 h-16'>
        <div className='flex items-center gap-4'>
          <button onClick={toggleSidebar} className='p-2 rounded-full hover:bg-white/20'>
            <Menu size={20} className='text-white' />
          </button>
          <img src="/logo.png" alt="logo" className='h-8 w-8' />
          <h1 className='text-md font-inter font-semibold text-white'>CogniChat</h1>
        </div>

      
        <div className='relative flex items-center'>
          {loading ? (
            <div className='h-8 w-8 bg-gray-700 rounded-full animate-pulse'></div>
          ) : user ? (
            <>
              <button
                onClick={() => setPopupOpen(!isPopupOpen)}
                className='h-8 w-8 rounded-full flex items-center justify-center bg-gray-600 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
              >
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.fullName} className='h-full w-full object-cover' />
                ) : (
                  <span className='font-semibold text-white text-xs'>{getInitials(user.fullName)}</span>
                )}
              </button>

              {isPopupOpen && (
                <div
                  ref={popupRef}
                  className='absolute top-12 right-0 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-50'
                >
                  <button
                    onClick={logout}
                    href='https://cognichat-backend.onrender.com/auth/logout'
                    className='flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors'
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <a href='https://cognichat-backend.onrender.com/auth/google' className='bg-white px-2 py-1 text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors duration-300'>
              Sign Up
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;