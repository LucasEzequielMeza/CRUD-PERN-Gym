import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Label from '../components/UI/Label';
import Textarea from '../components/UI/Textarea';
import Select from '../components/UI/Select';
import Button from '../components/UI/Button';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useExercise } from '../context/ExerciseContext';

function ExerciseFormPage() {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const { updateExercise, createExercise, loadExercise, exerciseErrors } = useExercise();
    const params = useParams();

    const bodyPart = [
        { value: 'biceps', label: 'Bíceps' },
        { value: 'triceps', label: 'Tríceps' },
        { value: 'pectoral', label: 'Pecho' },
        { value: 'dorsal', label: 'Espalda' },
        { value: 'deltoides', label: 'Hombros' },
        { value: 'trapecio', label: 'Trapecios' },
        { value: 'abdominales', label: 'Abdominales' },
        { value: 'cuadriceps', label: 'Cuádriceps' },
        { value: 'isquiotibiales', label: 'Isquiotibiales' },
        { value: 'gluteos', label: 'Glúteos' },
        { value: 'pantorrillas', label: 'Pantorrillas' },
    ];
    

    const onSubmit = handleSubmit(async (data) => {
        let response;
        if (params.id) {
            response = await updateExercise(params.id, data);
        } else {
            response = await createExercise(data);
        }
        if (response) {
            navigate('/ejercicios');
        }
    })

    useEffect(() => {
        if (params.id) {
            loadExercise(params.id).then(data => {
                Object.keys(data).forEach(key => {
                    setValue(key, data[key]);
                })
            })
        }
    }, []) //revisar


    return (
        <div>
            <Card>
                {
                    exerciseErrors.map((error, i) => (
                        <p className='text-red-500' key={i}>{error}</p>
                    ))
                }
                <h2 className='text-3xl font-bold text-white my-4 flex items-center justify-center'>
                    {
                        params.id? "Editar Ejercicio" : "Crear Ejercicio"
                    }
                </h2>
                <form onSubmit={onSubmit}>
                    <Label htmlFor="name_exercise">Nombre del Ejercicio</Label>
                    <Input type="text" autoFocus {...register('name_exercise', { required: true })} />
                    {
                        errors.name_exercise && <p className='text-red-500'>El nombre del ejercicio es requerido</p>
                    }
                    <Label htmlFor="description">Descripción del Ejercicio</Label>
                    <Textarea {...register('description', { required: true })} />
                    {
                        errors.description && <p className='text-red-500'>La descripción del ejercicio es requerida</p>
                    }
                    <Label htmlFor="body_part">Parte del Cuerpo</Label>
                    <Select {...register('body_part', { required: true })} options={bodyPart} />
                    {
                        errors.body_part && <p className='text-red-500'>La parte del cuerpo es requerida</p>
                    }
                    <Label htmlFor="link">Link del Ejercicio</Label>
                    <Input type="text" {...register('link', { required: true })} />
                    {
                        errors.link && <p className='text-red-500'>El link del ejercicio es requerido</p>
                    }
                    <Button className='mt-4'>
                        {
                            params.id? "Editar Ejercicio" : "Crear Ejercicio"
                        }
                    </Button>
                </form>
            </Card>
        </div>
    )

}

export default ExerciseFormPage;