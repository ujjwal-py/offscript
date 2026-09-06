import React from 'react'
import { useAuth } from '../context/UserContext';


// user details 
// total posts, published and non published
// total likes on posts
// own liked posts


function Profile() {
  const { user } = useAuth();

  return (
    <>
      <div>
        <h2>User info</h2>
        <h3>{user.name}</h3>
      </div>
    </>
  )
}

export default Profile