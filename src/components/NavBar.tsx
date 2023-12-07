import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './NavBar.scss';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '..';

function NavBar() {
  const auth = getAuth(app);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
        navigate('/');
      })
  };

  const profileLink = loggedIn ? (
    <Link to="/user">Profile</Link>
  ) : (
    <Link to="/login">Profile</Link>
  );

  return (
    <div className="navbar">
      <div className="navbar-links">
        <Link to="/calendar">Calendar</Link>
        <Link to="/">Shows</Link>
        {profileLink}
        <Link to="/detail">detail</Link>
      </div>

      <div className="user-icon">
        {loggedIn ? (
          <button className="logout-button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        ) : (
          <Link to="/login">
            <div className="user-circle">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
