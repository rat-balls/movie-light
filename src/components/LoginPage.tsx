import React from 'react'
import './LoginPage.scss' 

export default function LoginPage() {
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