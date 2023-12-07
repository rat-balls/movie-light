import React, { FormEvent, useEffect, useState } from 'react';
import './LoginPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '..';

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [userEmail, setUserEmail] = useState('');
  const [userPswrd, setUserPswrd] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, userPswrd)
      .then(() => {
        console.log('logged in');
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
          setErrorMsg('Email ou Mot de passe erronés');
        } else {
          setErrorMsg(error.message);
        }
      });
  }

  useEffect(() => {
    if (auth.currentUser !== null) {
      navigate('/');
    }
  }, [auth.currentUser, navigate]);

  return (
    <div className="login-page">
      <h1 className="NamePage">LOGIN PAGE</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userPswrd}
          onChange={(e) => setUserPswrd(e.target.value)}
          required
        />
        {errorMsg !== '' && <p>{errorMsg}</p>}
        {!auth.currentUser && (
          <p>
            No Account ?{' '}
            <Link to="/register" className="register-link">
              Register Here
            </Link>
          </p>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
