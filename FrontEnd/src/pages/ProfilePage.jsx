import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axios';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Label from '../components/UI/Label';
import Button from '../components/UI/Button';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useAuth();
  const { register: registerProfile, handleSubmit: handleSubmitProfile, formState: { errors: profileErrors }, clearErrors } = useForm({
    defaultValues: {
      address: user.address,
      phone_number: user.phone_number,
    }
  }); 
  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: passwordErrors }, reset: resetPassword } = useForm(); 
  const [updateError, setUpdateError] = useState([]); 
  const [updateSuccess, setUpdateSuccess] = useState(false); 
  const [passwordError, setPasswordError] = useState([]);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  
  const updateProfile = handleSubmitProfile(async (data) => {
    try {
      clearErrors();
      await axios.put(`/users/${user.id}`, {
        address: data.address,
        phone_number: data.phone_number,
      });
      setUpdateError([]);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000); 
    } catch (error) {
      setUpdateError([error.response?.data?.message || 'Error al actualizar el perfil']);
    }
  });

  const changePassword = handleSubmitPassword(async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      setPasswordError(['Las contraseñas no coinciden']);
      return;
    }
    try {
      await axios.put(`/users/${user.id}/change-password`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      setPasswordError([]);
      setPasswordSuccess(true);
      resetPassword();
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error) {
      setPasswordError([error.response?.data?.message || 'Error al cambiar la contraseña']);
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formattedBirthDate = formatDate(user.birth_date);

  return (
<div>
    <h1 className="text-4xl font-bold text-center my-6">Actualización de datos de usuario</h1>
    <div className="flex space-x-4 justify-center items-start">
      <Card className="flex-1 min-w-[300px] min-h-[400px] h-full flex-grow">
        <h2 className='text-3xl font-bold text-white my-4 flex items-center justify-center'>Información Personal</h2>
        <div className="flex justify-center items-center space-x-4">
          <div>
            <Label htmlFor="first_name">Nombre</Label>
            <Input className="cursor-not-allowed text-white" type="text" id="first_name" value={user.first_name} disabled />
          </div>
          <div>
            <Label htmlFor="last_name">Apellido</Label>
            <Input className="cursor-not-allowed text-white" type="text" id="last_name" value={user.last_name} disabled />
          </div>
          <div>
            <Label htmlFor="birth_date">Fecha de nacimiento</Label>
            <Input className="cursor-not-allowed text-white" type="text" id="birth_date" value={formattedBirthDate} disabled />
          </div>
        </div>
  
        <h2 className='text-3xl font-bold text-white my-4 flex items-center justify-center'>Cuenta</h2>
        <div className="flex justify-center items-center space-x-4">
          <div>
            <Label htmlFor="email">Correo Electronico</Label>
            <Input className="cursor-not-allowed text-white" type="text" id="email" value={user.email} disabled />
          </div>
        </div>
  
        <h2 className='text-3xl font-bold text-white my-4 flex items-center justify-center'>Datos de contacto</h2>
        <form onSubmit={updateProfile} className="flex flex-wrap justify-center items-center space-x-4">
          <div>
            <Label htmlFor="phone_number">Teléfono</Label>
            <Input type="text" {...registerProfile('phone_number', { required: true })} />
            {profileErrors.phone_number && <p className='text-red-500'>El teléfono es requerido</p>}
          </div>
          <div>
            <Label htmlFor="address">Dirección</Label>
            <Input type="text" {...registerProfile('address', { required: true })} />
            {profileErrors.address && <p className='text-red-500'>La dirección es requerida</p>}
          </div>
          {updateError.map((error, i) => (
            <p key={i} className='text-red-500'>{error}</p>
          ))}
          <div className="w-full flex justify-center mb-4">
            <Button type="submit">Actualizar Perfil</Button>
          </div>
          {updateSuccess && (
            <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
              Datos actualizados correctamente.
            </div>
          )}
        </form>
      </Card>
  
      <Card className="flex-1 min-w-[300px] min-h-[526px] h-full flex-grow">
        <h2 className='text-3xl font-bold text-white my-4 flex items-center justify-center'>Cambiar Contraseña</h2>
        <form onSubmit={changePassword} className="flex flex-col items-center space-y-4">
          <div>
            <Label htmlFor="currentPassword">Contraseña Actual</Label>
            <Input type="password" {...registerPassword('currentPassword', { required: true })} />
            {passwordErrors.currentPassword && <p className='text-red-500'>La contraseña actual es requerida</p>}
          </div>
          <div>
            <Label htmlFor="newPassword">Nueva Contraseña</Label>
            <Input type="password" {...registerPassword('newPassword', { required: true })} />
            {passwordErrors.newPassword && <p className='text-red-500'>La nueva contraseña es requerida</p>}
          </div>
          <div>
            <Label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</Label>
            <Input type="password" {...registerPassword('confirmNewPassword', { required: true })} />
            {passwordErrors.confirmNewPassword && <p className='text-red-500'>Confirmar nueva contraseña es requerida</p>}
          </div>
          {passwordError.map((error, i) => (
            <div key={i} className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              {error}
            </div>
          ))}
          {passwordSuccess && (
            <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
              Contraseña actualizada correctamente.
            </div>
          )}
          <div className="w-full flex justify-center mb-4">
            <Button type="submit">Cambiar Contraseña</Button>
          </div>
        </form>
      </Card>
    </div>
  </div>

  );
}

export default ProfilePage;
