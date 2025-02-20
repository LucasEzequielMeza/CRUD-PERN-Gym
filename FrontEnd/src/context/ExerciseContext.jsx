import React, {createContext, useState, useContext} from "react";
import axios from '../api/axios.js'

export const useExercise = () => {
    const context = useContext()
    if (!context) {
        throw new Error('useExercise must be used within an ExerciseProvider')
    }
    return context
}

export const ExerciseProvider = ({children}) => {
        
}