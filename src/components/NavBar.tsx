import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'

function NavBar() {
  return (
    <div className="navbar">
      <Link to="/">Home</Link> 
      <Link to="/register">Register</Link> 
      <Link to="/login">Login</Link>
      <Link to="/weekly">Weekly!</Link>
    </div>
  )
}

export default NavBar;