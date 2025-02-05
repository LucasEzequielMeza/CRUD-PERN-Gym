import React from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Label from '../components/UI/Label';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { signin, errors } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);
    if (user) navigate('/profile');
  });

  return (
    <div className='h-[calc(100vh-8rem)] flex items-center justify-center'>
      <Card>
        {errors && errors.map((err, index) => (
          <p key={index} className='bg-red-500 text-white p-2 text-center'>{err.message || err}</p>
        ))}
        <h1 className='text-2xl font-bold text-white'>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
          <Label htmlFor='email'>E-mail</Label>
          <Input
            type='email'
            placeholder='Ingrese su usuario'
            {...register('email', {
              required: true,
            })}
          />
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            placeholder='Ingrese su contraseña'
            {...register('password', {
              required: true,
            })}
          />
          <Button type='submit' className='w-full'>
            Iniciar Sesión
          </Button>
        </form>
        <div className='flex justify-between my-4'>
          <p className='text-center text-gray-400'>
            ¿No tienes una cuenta? <Link className='font-bold' to='/register'>Regístrate aquí</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
