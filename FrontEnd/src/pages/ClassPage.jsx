import React, { useEffect } from 'react';
import Card from '../components/UI/Card';
import Label from '../components/UI/Label.jsx';
import Button from '../components/UI/Button.jsx';
import { useClass } from '../context/ClassContext';
import { useNavigate } from 'react-router-dom';

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

function ClassPage() {
  const { classes, loadClasses, deleteClass } = useClass();
  const navigate = useNavigate();

  useEffect(() => {
    loadClasses();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-6">Clases</h1>
      <ul className="space-y-4">
        {classes.map((classItem) => (
          <Card key={classItem.id}>
            <Label htmlFor="title">Titulo</Label>
            <h2 className='text-white'>{classItem.title}</h2>
            <Label htmlFor="description">Descripción</Label>
            <p className='text-white'>{classItem.description}</p>
            <Label htmlFor="data_time">Fecha</Label>
            <p className='text-white'>{formatDateTime(classItem.data_time)}</p>
            <div>
              <Button onClick={() => navigate(`/clases/${classItem.id}/edit`)}>Editar</Button>
              <Button
                onClick={() => {
                  if (window.confirm('¿Estás seguro de eliminar esta clase?')) {
                    deleteClass(classItem.id);
                  }
                }}
              >
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
}

export default ClassPage;
