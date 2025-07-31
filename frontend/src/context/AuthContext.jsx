import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        try {
            await axios.post('https://cognichat-backend.onrender.com/auth/logout',{} , {
                withCredentials:true,
        });
        setUser(null)
        toast.success("Logged out successfully!");
        } catch (error) {
            console.error(`Failed to log out` , error)
        }
    }

    useEffect(() => {
        const checkedLoggedIn = async () => {
            try {
                const response = await axios.get('https://cognichat-backend.onrender.com/auth/current_user' , {
                    withCredentials:true
                })
                setUser(response.data)
                if (!sessionStorage.getItem('toastShown')) {
                    toast.success(`Welcome back, ${response.data.fullName.split(' ')[0]}!`);
                    sessionStorage.setItem('toastShown', 'true');
                 }else {
                    setUser(null);
                    sessionStorage.removeItem('toastShown');
                }
                
            } catch (error) {
                setUser(null);
                sessionStorage.removeItem('toastShown');
            }
            finally{
                setLoading(false)
            }
        };
        checkedLoggedIn();
    },[])

  return (
    <AuthContext.Provider value={{ user , setUser , loading , logout }} >
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext)
};
 