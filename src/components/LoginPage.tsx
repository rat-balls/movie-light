import React, { useEffect } from 'react'
import './LoginPage.scss' 
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '..';

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    if(auth.currentUser !== null) {
      navigate('/');
    }
  }
  , [auth.currentUser, navigate]);

  return (
    <div className="login-page">
      <h1 className='NamePage'>LOGIN PAGE</h1>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  )
}