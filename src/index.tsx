import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrr1BLI30V-raHt0V7kZ0AkCs5OKryIfU",
  authDomain: "movie-light-383dd.firebaseapp.com",
  projectId: "movie-light-383dd",
  storageBucket: "movie-light-383dd.appspot.com",
  messagingSenderId: "860094022085",
  appId: "1:860094022085:web:b8a678c7440bc70000cbac",
  measurementId: "G-7G3MYDEVD5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
