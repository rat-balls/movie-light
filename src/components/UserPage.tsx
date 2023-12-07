import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './UserPage.scss'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '..';

function UserPage() {
  const [displayName, setDisplayName] = useState('');
  const auth = getAuth(app);
  const user = auth.currentUser;

  onAuthStateChanged(auth, (user) => {
    if(user && user.displayName !== null) {
      setDisplayName(user.displayName);
    }
  })
  
  return (
    <div className="user-page">
      <FontAwesomeIcon icon={faUser} className="profile-icon" />
      <h1 className="user-name">{displayName}</h1>
    </div>
  )
}

export default UserPage;