import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from '../api/axios.js';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    });
    
    
    const [isAuth, setIsAuth] = useState(!!Cookies.get('token') || !!localStorage.getItem('token'));
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token') || localStorage.getItem('token');
        if (token) {
            axios.get('/profile', { withCredentials: true })
                .then(res => {
                    setUser(res.data);
                    setIsAuth(true);
                })
                .catch(() => {
                    setUser(null);
                    setIsAuth(false);
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const signup = async (data) => {
        try {
            const response = await axios.post('/signup', data, { withCredentials: true });
            const token = response.data.token;
            setUser(response.data.user);
            setIsAuth(true);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', token);
            return response.data;
        } catch (error) {
            setErrors(error.response?.data || ['Error desconocido']);
        }
    };

    const signin = async (data) => {
        try {
            const response = await axios.post('/signin', data, { withCredentials: true });
            const token = response.data.token;
            setUser(response.data.user);
            setIsAuth(true);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', token);
            return response.data;
        } catch (error) {
            setErrors(error.response?.data || ['Error desconocido']);
        }
    };

    const signout = async () => {
        await axios.post('/signout', {}, { withCredentials: true });
        setUser(null);
        setIsAuth(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        Cookies.remove('token');
    };

    return (
        <AuthContext.Provider value={{ user, isAuth, errors, loading, signup, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}
