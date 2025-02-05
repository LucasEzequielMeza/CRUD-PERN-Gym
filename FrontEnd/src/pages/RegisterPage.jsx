import React from 'react';
import { useForm } from 'react-hook-form'
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Label from '../components/UI/Label';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
function RegisterPage() {

  const {register, handleSubmit, formState: { errors }} = useForm();

  const {signup, errors: signupErrors} = useAuth()

  const navigate = useNavigate()

  const onSubmint = handleSubmit(async (data) => {
    /*const response = await fetch('http://localhost:3000/api/signup',{
      method: 'POST',
      credentials: 'include', //Guardamos las credenciales
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(data)
    })

    const dateSignup = await response.json()

    console.log(dateSignup)
    */
    const user = await signup(data)
    if (user) navigate('/profile')
  });

  return (
    <div className='h-[calc(100vh-8rem)] flex items-center justify-center'>
      <Card>
      { signupErrors && (
          signupErrors.map((err) => (
              <p key={err.id} className='bg-red-500 text-white p-2 text-center'>{ err }</p>
            ))
          )
        }
        <h1 className='text-2xl font-bold text-white'>Registro</h1>
        <form onSubmit={onSubmint}>
          <Label htmlFor="first_name">Nombre</Label>
          <Input {...register('first_name', {required:true})} type="text" placeholder="Ingrese su nombre" />
          {errors.first_name && <p className='text-red-500'>El nombre es requerido</p>}
          <Label htmlFor="last_name">Apellido</Label>
          <Input {...register('last_name', {required: true})} type="text" placeholder="Ingrese su apellido" />
          {errors.last_name && <p className='text-red-500'>El apellido es requerido</p>}
          <Label htmlFor="birth_date">Fehca de nacimiento</Label>
          <Input {...register('birth_date', {required: true})} type="date" placeholder="Ingrese su fecha de nacimiento"/>
          {errors.birth_date && <p className='text-red-500'>Fecha de nacimiento</p>}
          <Label htmlFor="address">Dirección</Label>
          <Input {...register('address', {required: true})} type="text" placeholder="Ingrese su dirección" />
          {errors.address && <p className='text-red-500'>La dirección es requerida</p>}
          <Label htmlFor="phone_number">Teléfono</Label>
          <Input {...register('phone_number', {required: true})} type="number" placeholder="Ingrese su número de teléfono" />
          {errors.phone_number && <p className='text-red-500'>El número de teléfono es requerido</p>}
          <Label htmlFor="email">E-mail</Label>
          <Input {...register('email', {required: true})} type="email" placeholder="Correo electrónico" />
          {errors.email && <p className='text-red-500'>El e-mail es requerido</p>}
          <Label htmlFor="password">Password</Label>
          <Input {...register('password', {required: true})} type="password" placeholder="Contraseña" />
          {errors.password && <p className='text-red-500'>La contraseña es requerida</p>}
          {/*<Input type="password" placeholder="Confirmar contraseña" />*/}
          <Button type="submit">Registrarse</Button>
        </form>
        <div className='flex justify-between my-4'>
          <p className="text-center text-gray-400">
            ¿Tienes una cuenta? <Link className='font-bold' to="/login">Ingresa aquí</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default RegisterPage