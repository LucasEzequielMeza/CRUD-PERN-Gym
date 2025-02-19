import React, { useEffect } from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Label from '../components/UI/Label';
import Textarea from '../components/UI/Textarea';
import Button from '../components/UI/Button';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useClass } from '../context/ClassContext';

function ClassFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const { updateClass, createClass, loadClass, classErrors } = useClass();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    let res;
    if (params.id) {
      res = await updateClass(params.id, data);
    } else {
      res = await createClass(data);
    }
    if (res) navigate('/clases');
  });

  useEffect(() => {
    if (params.id) {
      loadClass(params.id).then((classItem) => {
        setValue('title', classItem.title);
        setValue('description', classItem.description);
        setValue('data_time', classItem.data_time);
      });
    }
  }, [params.id, loadClass, setValue]);

  return (
    <div>
      <Card>
        {classErrors.map((error, i) => (
          <p key={i} className='text-red-500'>{error}</p>
        ))}
        <h2 className='text-3xl font-bold text-white my-4 flex items-center justify-center'>
          {params.id ? "Editar Clase" : "Crear Clase"}
        </h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="type_class">Tipo de clase</Label>
          <Input autoFocus {...register('type_class', { required: true })} />
          {errors.type_class && (
            <p className='text-red-500'>El nombre de la clase es requerido</p>
          )}
          <Label htmlFor="title">Nombre de la clase</Label>
          <Input type="text" {...register('title', { required: true })} />
          {errors.title && (
            <p className='text-red-500'>El nombre de la clase es requerido</p>
          )}
          <Label htmlFor="description">Descripción</Label>
          <Textarea {...register('description', { required: true })} />
          {errors.description && (
            <p className='text-red-500'>La descripción es requerida</p>
          )}
          <Label htmlFor="data_time">Fecha y Hora</Label>
          <Input type="datetime-local" {...register('data_time', { required: true })} />
          {errors.data_time && (
            <p className='text-red-500'>La fecha y hora son requeridas</p>
          )}
          <Button>
            {params.id ? "Actualizar" : "Crear"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default ClassFormPage;
