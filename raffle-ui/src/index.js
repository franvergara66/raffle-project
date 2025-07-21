// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/adminlte.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Scripts
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'admin-lte/dist/js/adminlte.min.js';


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/admin.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Load styles located in the public assets folder
const publicStyle = document.createElement('link');
publicStyle.rel = 'stylesheet';
publicStyle.href = `${process.env.PUBLIC_URL}/assets/admin/css/app.css`;
document.head.appendChild(publicStyle);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
