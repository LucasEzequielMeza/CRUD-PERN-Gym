import React, { useEffect, useState } from 'react';
import Card from '../components/UI/Card';
import Label from '../components/UI/Label.jsx';
import Button from '../components/UI/Button.jsx';
import { useRoutine } from '../context/RoutineContext.jsx';
import { useNavigate } from "react-router-dom";

function RoutinePage() {
  const { routines, loadRoutines, updateRoutine, deleteRoutine } = useRoutine();
  const navigate = useNavigate();
  const [activeRoutine, setActiveRoutine] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  let timer;

  useEffect(() => {
    loadRoutines();
  }, []);

  useEffect(() => {
    if (activeRoutine) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeRoutine]);

  const startRoutine = (routine) => {
    setActiveRoutine(routine);
    setTimeElapsed(0);
    setExerciseIndex(0);
    updateRoutine(routine.id, { started_at: new Date() });
  };

  const nextExercise = () => {
    if (exerciseIndex < activeRoutine.description.split('\n').length - 1) {
      setExerciseIndex(exerciseIndex + 1);
    } else {
      completeRoutine();
    }
  };

  const completeRoutine = async () => {
    clearInterval(timer);


    await updateRoutine(activeRoutine.id, { completed: true, completed_at: new Date().toISOString() });
    
    await loadRoutines();

    setActiveRoutine(prev => ({ ...prev, completed: true }));

    alert(`Rutina completada en ${timeElapsed} segundos`);
    setActiveRoutine(null);
  };

  return (
    <div>
      <h1>Rutinas</h1>
      <ul>
        {routines.map(r => (
          <Card key={r.id}>
            <Label htmlFor="title">Nombre de la rutina</Label>
            <h2 className='text-white'>{r.title}</h2>
            <Label htmlFor="description">Ejercicios de la rutina</Label>
            <p className='text-white'>{r.description}</p>
            <Label htmlFor="day_of_week">Día de la Semana</Label>
            <p className='text-white'>{r.day_of_week}</p>
            <Label htmlFor="duration">Duración esperada</Label>
            <p className='text-white'>{r.duration} minutos</p>
            <Label htmlFor="completed">¿Rutina completa?</Label>
            <p className='text-white'>{r.completed ? 'Completada' : 'Pendiente'}</p>

            <div className='my-2 flex justify-end gap-x-2'>
              <Button onClick={() => navigate(`/rutinas/${r.id}/edit`)}>Editar</Button>
              <Button onClick={() => {
                if (window.confirm('¿Estás seguro de eliminar la rutina?')) {
                  deleteRoutine(r.id);
                }
              }} className="bg-red-500 hover:bg-red-600">Eliminar</Button>
            </div>

            {!activeRoutine && !r.completed && (
              <Button onClick={() => startRoutine(r)} className="bg-green-500 hover:bg-green-600">
                Iniciar Rutina
              </Button>
            )}

            {activeRoutine?.id === r.id && (
              <div>
                <p className="text-white">Tiempo transcurrido: {timeElapsed} segundos</p>
                <p className="text-white">Ejercicio actual: {activeRoutine.description.split('\n')[exerciseIndex]}</p>
                <Button onClick={nextExercise} className="bg-yellow-500 hover:bg-yellow-600">
                  {exerciseIndex < activeRoutine.description.split('\n').length - 1 ? 'Siguiente' : 'Finalizar'}
                </Button>
              </div>
            )}
          </Card>
        ))}
      </ul>
    </div>
  );
}

export default RoutinePage;