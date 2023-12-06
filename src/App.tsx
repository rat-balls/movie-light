// App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App;
