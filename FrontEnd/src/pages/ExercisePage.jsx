import React, { useEffect } from 'react';
import Card from '../components/UI/Card';
import Label from '../components/UI/Label.jsx';
import Button from '../components/UI/Button.jsx';
import { useExercise } from '../context/ExerciseContext.jsx';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; 

function ExercisePage() {
  const { exercises, loadExercises, deleteExercise } = useExercise();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadExercises();
  }, []);

  const handleViewVideo = (link) => {
    window.open(link, '_blank');
  }

  return (
    <div>
      <h1>Tipos de Ejercicios</h1>
      <ul>
        {
          exercises.map(exercise => (
            <Card key={exercise.id}>
              <Label htmlFor="name_exercise">Nombre del Ejercicio</Label>
              <h2 className='text-white'>{exercise.name_exercise}</h2>
              <Label htmlFor="description">Descripción</Label>
              <p className='text-white'>{exercise.description}</p>
              <Label htmlFor="body_part">Parte del Cuerpo</Label>
              <p className='text-white'>{exercise.body_part}</p>
              <Label htmlFor="link">Link</Label>
              <Button onClick={() => handleViewVideo(exercise.link)} className="bg-blue-500 hover:bg-blue-600">Ver Video</Button>
              {user?.role === 'admin' && ( 
                <div className='my-2 flex justify-end gap-x-2'>
                  <Button onClick={() => navigate(`/ejercicios/${exercise.id}/edit`)}>Editar</Button>
                  <Button onClick={() => {
                    if (window.confirm('¿Estás seguro de eliminar este ejercicio?')) {
                      deleteExercise(exercise.id);
                    }
                  }} className="bg-red-500 hover:bg-red-600">Eliminar</Button>
                </div>
              )}
            </Card>
          ))
        }
      </ul>
    </div>
  );
}

export default ExercisePage;
