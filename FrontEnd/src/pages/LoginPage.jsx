import React from 'react'
import Card from '../components/UI/Card'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import Label from '../components/UI/Label'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

function LoginPage() {

  const {register, handleSubmit} = useForm()

  const onSubmit = handleSubmit( async (data) => {

    const res = await axios.post('http://localhost:3000/api/signin', data, {
      withCredentials: true,
    })

    console.log(res)
  })

  return (
    <div className='h-[calc(100vh-64px)] flex items-center justify-center'>
      <Card>
        <h1 className='text-2xl font-bold text-white'>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
          <Label htmlFor="email" >E-mail</Label>
          <Input type="email" placeholder="Ingrese su usuario" {...register('email', {
            required:true
          }) }/>
          <Label htmlFor="password" >Password</Label>
          <Input type="password" placeholder="Ingrese su contraseña" {...register('password', {
            required:true
          })}/>
          <Button type="submit" className="w-full">Iniciar Sesión</Button>
        </form>
        <div className='flex justify-between my-4'>
          <p className="text-center text-gray-400">
            ¿No tienes una cuenta? <Link className='font-bold' to="/register">Regístrate aquí</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default LoginPage