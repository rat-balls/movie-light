import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '..';

function NavBar() {
  const auth = getAuth(app);
  const [loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if(user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  })

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      {!loggedIn ? 
      <>
      <Link to="/register">Register</Link> 
      <Link to="/login">Login</Link>
      </> 
      : 
      <>
        <Link to="/user">User</Link>
        <Link to="/logout">Logout</Link>
      </>}
      </div>
  )
}

export default NavBar;