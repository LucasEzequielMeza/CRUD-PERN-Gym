import React, { createContext, useState, useContext } from 'react'
import axios from '../api/axios.js'

const ClassContext = createContext()

export const useClass = () => {
    const context = useContext(ClassContext)
    if (!context) {
        throw new Error('useClass must be used within a ClassProvider')
    }
    return context
}

export const ClassProvider = ({ children }) => {
    const [classes, setClasses] = useState([])
    const [classErrors, setClassErrors] = useState([])

    const loadClasses = async () => {
        try {
            const res = await axios.get('/clases')
            setClasses(res.data)
        } catch (error) {
            if (error.response) {
                setClassErrors([error.response.data])
            }
        }
    }

    const loadClass = async (id) => {
        try {
            const res = await axios.get(`/clases/${id}`)
            return res.data
            
        } catch (error) {
            if (error.response) {
                setClassErrors([error.response.data])
            }
        }
    }

    const createClass = async (data) => {
        try {
            const res = await axios.post('/clases', data)
            setClasses([...classes, res.data])
            return res.data
        } catch (error) {
            if (error.response) {
                setClassErrors([error.response.data])
            }
        }
    }

    const updateClass = async (id, data) => {
        try {
            const res = await axios.put(`/clases/${id}`, data)
            return res.data
        } catch (error) {
            if (error.response) {
                setClassErrors([error.response.data])
            }
        }
    }

    const deleteClass = async (id) => {
        try {
            const res = await axios.delete(`/clases/${id}`);
            console.log('Response:', res);
            if (res.status === 204) {
                setClasses(classes.filter(classItem => classItem.id !== id));
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                setClassErrors([error.response.data]);
            } 
        }
    }

    return (
        <ClassContext.Provider value={{
            classes,
            classErrors,
            loadClasses,
            loadClass,
            createClass,
            updateClass,
            deleteClass
        }}>
            {children}
        </ClassContext.Provider>
    )
    
}

