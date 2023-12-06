import React from 'react'
import './RegisterPage.scss'

export default function RegisterPage() {
  return (
    <div className="register-page">
      <h1 className='NamePage'>REGISTER PAGE</h1>
      <form>
        <input className='UserName' type="text" placeholder="Nom d'utilisateur" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Mot de passe" required />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  )
}