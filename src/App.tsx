// App.tsx
import React from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import WeeklyAiringPage from './components/WeeklyAiring';
import UserPage from './components/UserPage';
import LogoutPage from './components/LogoutPage';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path='/Weekly' element={<WeeklyAiringPage/>}/>
        <Route path="/Logout" element={<LogoutPage />} />
        <Route path="/User" element={<UserPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
