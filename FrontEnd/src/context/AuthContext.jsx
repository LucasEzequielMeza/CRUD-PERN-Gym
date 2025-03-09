import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from '../api/axios.js';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token') || localStorage.getItem('token');
        
    
        if (!token) {
            setLoading(false);
            return;
        }
    
        axios.get('/profile', { withCredentials: true })
            .then(res => {
                setUser(res.data);
                setIsAuth(true);
                localStorage.setItem('user', JSON.stringify(res.data));
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
            setErrors(null); 
    
            const response = await axios.post('/signin', data, { withCredentials: true });
    
            const { user, token } = response.data;
            
            if (!token) {
                console.error("Token no recibido");
                return;
            }
    
            setUser(user); 
            setIsAuth(true); 
    
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            Cookies.set('token', token); 
    
            navigate('/');
        } catch (error) {
            console.error("Error en signin:", error);
            setErrors([error.response?.data.message || 'Error desconocido']);
        }
    };
    
    
    
    

    const signout = async () => {
        await axios.post('/signout', {}, { withCredentials: true });
        setUser(null);
        setIsAuth(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        Cookies.remove('token');
        navigate('/login'); 
    };
    

    return (
        <AuthContext.Provider value={{ user, isAuth, errors, loading, signup, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}
