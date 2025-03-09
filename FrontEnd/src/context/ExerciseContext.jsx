import React, {createContext, useState, useContext} from "react";
import axios from '../api/axios.js'

const ExerciseContext = createContext()

export const useExercise = () => {
    const context = useContext(ExerciseContext)
    if (!context) {
        throw new Error('useExercise must be used within an ExerciseProvider')
    }
    return context
}

export const ExerciseProvider = ({children}) => {
    const [exercises, setExercises] = useState([])
    const [exerciseErrors, setExerciseErrors] = useState([])

    const loadExercises = async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await axios.get(`/exercises?${queryParams}`);
            setExercises(response.data);
        } catch (error) {
            setExerciseErrors(error.message);
        }
    };
    

    const loadExercise = async (id) => {
        try {
            const response = await axios.get(`/exercises/${id}`)
            return response.data
        } catch (error) {
            setExerciseErrors(error.message)
        }
    }

    const createExercise = async (data) => {
        try {
            const response = await axios.post('/exercises', data)
            setExercises([...exercises, response.data])
            return response.data
        } catch (error) {
            setExerciseErrors(error.message)
        }
    }

    const deleteExercise = async (id) => {
        try {
            const res = await axios.delete(`/exercises/${id}`)
            if (res.status === 204) {
                setExercises(exercises.filter(exercise => exercise.id !== id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateExercise = async (id, data) => {
        try {
            const response = await axios.put(`/exercises/${id}`, data)
            return response.data
        } catch (error) {
            setExerciseErrors(error.message)
        }
    }



    return (
        <ExerciseContext.Provider value={{
            exercises,
            exerciseErrors,
            loadExercises,
            loadExercise,
            createExercise,
            deleteExercise,
            updateExercise
        }}>
          {children}
        </ExerciseContext.Provider>
      );
}

