import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

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
            } catch (error) {
                setUser(null);
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
 