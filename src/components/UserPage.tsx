import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear } from '@fortawesome/free-solid-svg-icons';
import './UserPage.scss';

function UserPage() {
  const userName = "FARTHAN DELAFARTHE";
  const [showSettings, setShowSettings] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = () => {
    setShowSettings(true);
  };

  const handleValidateSettings = () => {
    setShowSettings(false);
  };

  return (
    <div className="user-page">
      <div className="user-header">
        <div className="user-info">
          <FontAwesomeIcon icon={faUser} className="profile-icon" />
          <h1 className="user-name">{userName}</h1>
        </div>
        <button className="change-email-button" onClick={handleChangeEmail}>
          <FontAwesomeIcon icon={faGear} className="gear-icon" />
          ‎ ‎ Réglages utilisateur
        </button>
      </div>
      {showSettings && (
        <div className="settings">
          <div className="settings-item">
            <p>Changer d'email</p>
            <input
              type="email"
              placeholder="Nouvel email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="settings-item">
            <p>Changer de mot de passe</p>
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="validate-settings-button" onClick={handleValidateSettings}>
            Valider les réglages
          </button>
        </div>
      )}
      <div className="user-movies">
        <p>My Favorite Show's</p>
      </div>
    </div>
  );
}

export default UserPage;
