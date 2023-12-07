import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear } from '@fortawesome/free-solid-svg-icons'
import './UserPage.scss'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '..';

function UserPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const auth = getAuth(app);

  const handleChangeEmail = () => {
    setShowSettings(prevState => !prevState);
  };  

  const handleValidateSettings = () => {
    setShowSettings(false);
  };


  onAuthStateChanged(auth, (user) => {
    if(user && user.displayName !== null) {
      setDisplayName(user.displayName);
    }
  })
  
  return (
    <div className="user-page">
      <div className="user-header">
        <div className="user-info">
          <FontAwesomeIcon icon={faUser} className="profile-icon" />
          <h1 className="user-name">{displayName}</h1>
        </div>
        <button className="change-email-button" onClick={handleChangeEmail}>
          <FontAwesomeIcon icon={faGear} className="gear-icon" />
          ‎ ‎ User settings
        </button>
      </div>
      {showSettings && (
        <div className="settings">
          <div className="settings-item">
            <p>Change email</p>
            <input
              type="email"
              placeholder="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="settings-item">
            <p>Change password</p>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="validate-settings-button" onClick={handleValidateSettings}>
          Validate the settings
          </button>
        </div>
      )}
      <div className="user-movies">
        <p>My Favorite Shows</p>
        <hr className="divider" />
      </div>
    </div>
  );
}

export default UserPage;
