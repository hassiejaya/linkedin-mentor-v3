import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// const ApiKey = localStorage.setItem("authKey",null);
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

