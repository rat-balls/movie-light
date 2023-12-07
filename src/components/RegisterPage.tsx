import React, { FormEvent, useEffect, useState } from 'react'
import './RegisterPage.scss'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { app } from '..'
import { Link, useNavigate } from 'react-router-dom'; 

export default function RegisterPage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPswrd, setUserPswrd] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const auth = getAuth(app);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    
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
        if(errorCode === 'auth/weak-password') {
          setErrorMsg('Mot de passe doit faire au moins 6 caractères');
        } else {
          setErrorMsg(error.message);
        }
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
        <input className='UserName' type="text" placeholder="UserName" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        <input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={userPswrd} onChange={(e) => setUserPswrd(e.target.value)} required />
        {errorMsg !== '' ? <p>{errorMsg}</p> : <></>}
        <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Log in here</Link></p>
    </div>
  )
}