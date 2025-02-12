import React, { useEffect } from 'react';
import Card from '../components/UI/Card';
import Label from '../components/UI/Label.jsx';
import Button from '../components/UI/Button.jsx';
import { useRoutine } from '../context/RoutineContext.jsx';
import { useNavigate } from "react-router-dom";


function RoutinePage() {
  const { routines, loadRoutines, deleteRoutine } = useRoutine();
  const navigate = useNavigate();

  useEffect(() => {
    loadRoutines();
  }, []);

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
            <Label htmlFor="duration">Duración</Label>
            <p className='text-white'>{r.duration}</p>
            <Label htmlFor="goals">Objetivo de la rutina</Label>
            <p className='text-white'>{r.goals}</p>
            <Label htmlFor="completed">¿Rutina completa?</Label>
            <p className='text-white'>{r.completed ? 'Completada' : 'Pendiente'}</p>
            <div className='my-2 flex justify-end gap-x-2'>
              <Button onClick={() => {
                navigate(`/rutinas/${r.id}/edit`)
              }} >Editar</Button>
              <Button onClick={() => {
                if (window.confirm('¿Estás seguro de eliminar la rutina?')) {
                  deleteRoutine(r.id);
                }
              }} className="bg-red-500 hover:bg-red-600">Eliminar</Button>
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
}

export default RoutinePage;
