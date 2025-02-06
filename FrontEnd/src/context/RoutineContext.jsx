import React, { createContext, useState, useContext } from 'react';
import axios from '../api/axios.js';

const RoutineContext = createContext();

export const useRoutine = () => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutine must be used within a RoutineProvider');
  }
  return context;
};

export const RoutineProvider = ({ children }) => {
  const [routines, setRoutines] = useState([]);

  const loadRoutine = async () => {
    try {
      const res = await axios.get('/routine');
      setRoutines(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const deleteRoutine = async (id) => {
    try {
      const res = await axios.delete(`/routine/${id}`);
      if (res.status === 204) {
        setRoutines(
            routines.filter(routine => routine.id !== id )
        )
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoutineContext.Provider value={{
      routines,  // Asegúrate de que esté correctamente nombrado
      loadRoutine,
      deleteRoutine
    }}>
      {children}
    </RoutineContext.Provider>
  );
};
