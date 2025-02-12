import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Label from '../components/UI/Label';
import Textarea from '../components/UI/Textarea';
import Select from '../components/UI/Select';
import Button from '../components/UI/Button';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useRoutine } from '../context/RoutineContext';
import axios from '../api/axios';

function RoutineFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const { updateRoutine, loadRoutine, createRoutine, routineErrors } = useRoutine();

  const daysOfWeek = [
    { value: 'lunes', label: 'Lunes' },
    { value: 'martes', label: 'Martes' },
    { value: 'miercoles', label: 'Miércoles' },
    { value: 'jueves', label: 'Jueves' },
    { value: 'viernes', label: 'Viernes' },
  ];

  const routineDurations = [
    { value: '30', label: '30 minutos' },
    { value: '60', label: '60 minutos' },
    { value: '90', label: '90 minutos' },
    { value: '120', label: '120 minutos' },
  ];

  const onSubmit = handleSubmit(async (data) => {
      let response;
      if (params.id) {
        response = await updateRoutine(params.id, data);
      } else {
        response = await createRoutine(data)
      }
      if (response) {
        navigate('/rutinas');
      }
  });


  useEffect(() => {
    if (params.id) {
      loadRoutine(params.id).then((routine) => {
        setValue("title", routine.title);
        setValue("description", routine.description);
        setValue("day_of_week", routine.day_of_week);
        setValue("duration", routine.duration);
        setValue("goals", routine.goals);
        setValue("completed", routine.completed);
      });
    }
  }, []);

  return (
    <div>
      <Card>
        {
          routineErrors.map((error, i) => (
            <p key={i} className='text-red-500'>{error}</p>
          ))
        }
        <h2 className='text-3xl font-bold text-white my-4 flex items-center justify-center'>
          {
            params.id ? "Editar Rutina" : "Crear Rutina"
          }
        </h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="title">Nombre de la rutina</Label>
          <Input type="text" autoFocus {...register('title', { required: true })} />
          {
            errors.title && (
              <p className='text-red-500'>El nombre de la rutina es requerido</p>
            )
          }
          <Label htmlFor="description">Ejercicios a hacer</Label>
          <Textarea {...register('description', { required: true })} />
          {
            errors.description && (
              <p className='text-red-500'>Los ejercicios a hacer son requeridos</p>
            )
          }
          <Label htmlFor="day_of_week">Día de la Semana</Label>
          <Select {...register('day_of_week', { required: true })} options={daysOfWeek} />
          <Label htmlFor="duration">Duración de la Rutina</Label>
          <Select {...register('duration', { required: true })} options={routineDurations} />
          <Label htmlFor="goals">Objetivo de la rutina</Label>
          <Textarea {...register('goals')} />
          <Button>
            {
              params.id ? "Editar" : "Crear"
            }
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default RoutineFormPage;
