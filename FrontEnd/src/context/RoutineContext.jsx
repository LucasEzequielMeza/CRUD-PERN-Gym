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
  const [routineErrors, setRoutineErrors] = useState([]);


  const loadRoutines = async () => {
    try {
      const res = await axios.get('/routine');
      setRoutines(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadRoutine = async (id) => {
    try {
      const res = await axios.get(`/routine/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const createRoutine = async (routine) => {
    try {
      const res = await axios.post('/routine', routine);
      setRoutines([...routines, res.data]);
      return res.data;
    } catch (error) {
      console.log(error)
      if (error.response) {
        setRoutineErrors([error.response.data])
      }
    }
  }
  

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

  const updateRoutine = async (id, routine) => {
    try {
      const res = await axios.put(`/routine/${id}`, routine);
      return res.data;
    } catch (error) {
      if (error.response) {
        setRoutineErrors([error.response.data])
      }
    }
  };



  return (
    <RoutineContext.Provider value={{
      routines,
      routineErrors,
      loadRoutines,
      loadRoutine,
      createRoutine,
      deleteRoutine,
      updateRoutine
    }}>
      {children}
    </RoutineContext.Provider>
  );
};
