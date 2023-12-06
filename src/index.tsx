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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, user => {
  if(user !== null) {
    console.log('logged in !');
  } else {
    console.log('no user');
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
