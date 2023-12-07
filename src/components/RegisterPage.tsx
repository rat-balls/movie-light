import React, { FormEvent, useEffect, useState } from 'react'
import './RegisterPage.scss'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { app } from '..'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPswrd, setUserPswrd] = useState('');

  const auth = getAuth(app);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(userEmail)
    console.log(userPswrd)
    createUserWithEmailAndPassword(auth, userEmail, userPswrd)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: userName
        });
        navigate('/');
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
  }
  , [auth.currentUser, navigate]);

  return (
    <div className="register-page">
      <h1 className='NamePage'>REGISTER PAGE</h1>
      <form onSubmit={handleSubmit}>
        <input className='UserName' type="text" placeholder="Nom d'utilisateur" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        <input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={userPswrd} onChange={(e) => setUserPswrd(e.target.value)} required />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  )
}