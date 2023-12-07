import React, { FormEvent, useEffect, useState } from 'react'
import './LoginPage.scss' 
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '..';

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [userEmail, setUserEmail] = useState('');
  const [userPswrd, setUserPswrd] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    signInWithEmailAndPassword(auth, userEmail, userPswrd)
        .then((userCredential) => {
          console.log('logged in')
          navigate('/')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });;
  }

  useEffect(() => {
    if(auth.currentUser !== null) {
      navigate('/');
    }
  }, [auth.currentUser, navigate]);

  return (
    <div className="login-page">
      <h1 className='NamePage'>LOGIN PAGE</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={userPswrd} onChange={(e) => setUserPswrd(e.target.value)} required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  )
}