import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './UserPage.scss'

function UserPage() {
  const userName = "FARTHAN DELAFART"; 

  return (
    <div className="user-page">
      <FontAwesomeIcon icon={faUser} className="profile-icon" />
      <h1 className="user-name">{userName}</h1>
    </div>
  )
}

export default UserPage;