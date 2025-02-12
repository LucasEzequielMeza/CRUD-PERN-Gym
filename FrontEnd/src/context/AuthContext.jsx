import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from '../api/axios.js'


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
    const [loading, setLoading] = useState(true)

    const signup = async (data) => {

        try {
                        
            const response = await axios.post('/signup', data)

            setUser(response.data)
            setIsAuth(true)

            return response.data
            
        } catch (error) {
            if (Array.isArray(error)) {
                return setErrrors(error.response.data)
            }
            setErrrors([error.response.data])
        }
    }

    const signin = async (data) => {
        try {
            const response = await axios.post('/signin', data)
          
            setUser(response.data)
            setIsAuth(true)

            return response.data
        } catch (error) {
            if (Array.isArray(error)) {
                return setErrrors(error.response.data)
            }
            setErrrors([error.response.data])
        }
    }

    const signout = async () => {
        await axios.post('/signout')
        setUser(null)
        setIsAuth(false)
    }

    useEffect(() => {
        setLoading(true)
        if (Cookies.get('token')) {
            axios.get('/profile')
            .then(res => {
                setUser(res.data)
                setIsAuth(true)
                setLoading(false)
            }).catch(() => {
                setIsAuth(false)
                setUser(null)
                setLoading(false)
            })
        }
    }, [])

    //Cualquier componente dentro del AuthContext va a poder acceder a los datos que le enviamos
    return (
        <AuthContext.Provider value={{
            user,
            isAuth,
            errors,
            loading,
            signup,
            signin,
            signout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
