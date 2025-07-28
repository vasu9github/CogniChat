import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkedLoggedIn = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/current_user' , {
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
    <AuthContext.Provider value={{ user , setUser , loading}} >
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext)
};
