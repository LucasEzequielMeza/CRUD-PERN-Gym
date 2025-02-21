import React, { useState, useEffect } from 'react';
import axios from '../api/axios.js';

function ClientsPage() {

  const [clients, setClients] = useState([]);
  const [clientsError, setClientsError] = useState([]);

  const loadClients = async () => {
    try {
      const response = await axios.get('/users');
      setClients(response.data);
    } catch (error) {
      setClientsError([error.response.data]);
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-6">Clientes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Nombre</th>
              <th className="py-2 px-4 border-b border-gray-300">Apellido</th>
              <th className="py-2 px-4 border-b border-gray-300">Mail</th>
              <th className="py-2 px-4 border-b border-gray-300">Teléfono</th>
              <th className="py-2 px-4 border-b border-gray-300">Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="text-center">
                <td className="py-2 px-4 border-b border-gray-300">{client.first_name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{client.last_name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{client.email}</td>
                <td className="py-2 px-4 border-b border-gray-300">{client.phone_number}</td>
                <td className="py-2 px-4 border-b border-gray-300">{client.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {clientsError.length > 0 && (
          <div className="mt-4 text-red-500">
            {clientsError.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientsPage;
