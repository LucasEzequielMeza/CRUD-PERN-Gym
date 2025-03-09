import React, { useEffect, useState } from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { useExercise } from '../context/ExerciseContext.jsx';

function ExercisePage() {
  const { exercises, loadExercises, deleteExercise } = useExercise();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadExercises({ search });
    }, 200);

    return () => clearTimeout(timeoutId); 
  }, [search]);

  return (
    <div>
      <h1>Tipos de Ejercicios</h1>

      <Input 
        type="text" 
        placeholder="Buscar por nombre o músculo..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />

      <ul>
        {exercises.map(exercise => (
          <Card key={exercise.id}>
            <h2 className='text-white'>{exercise.name_exercise}</h2>
            <p className='text-white'>{exercise.description}</p>
            <p className='text-white'>Músculo: {exercise.body_part}</p>
            <Button onClick={() => window.open(exercise.link, '_blank')}>Ver Video</Button>
            <Button onClick={() => deleteExercise(exercise.id)} className="bg-red-500">Eliminar</Button>
          </Card>
        ))}
      </ul>
    </div>
  );
}

export default ExercisePage;
