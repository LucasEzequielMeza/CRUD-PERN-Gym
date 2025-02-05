import React from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {

  const {user} = useAuth()


  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default Profile
