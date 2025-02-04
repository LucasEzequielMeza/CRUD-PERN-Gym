import React, { createContext, useState, useContext } from 'react'
import axios from 'axios'


export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error ('useAuth must be used within an AuthProvider')
    }

    return context
}

export function AuthProvider({children}) {

    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [errors, setErrrors] = useState(null)

    const signup = async (data) => {
        
        const response = await axios.post('http://localhost:3000/api/signup', data, {withCredentials: true})
        
        console.log(response.data)
        setUser(response.data)
    }

    const signin = async (data) => {
        const response = await axios.post('http://localhost:3000/api/signin', data, {
            withCredentials: true,
        })
      
        setUser(response.data)
    }

    //Cualquier componente dentro del AuthContext va a poder acceder a los datos que le enviamos
    return (
        <AuthContext.Provider value={{
            user,
            isAuth,
            errors,
            signup,
            signin,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
