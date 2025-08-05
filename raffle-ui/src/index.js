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
import './styles/content.css';
import './styles/base.css';
import './styles/app.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Load styles located in the public assets folder
const styleHrefs = [
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  `${process.env.PUBLIC_URL}/assets/admin/css/vendor/bootstrap.min.css`,
  `${process.env.PUBLIC_URL}/assets/admin/css/vendor/bootstrap-toggle.min.css`,
  `${process.env.PUBLIC_URL}/assets/admin/css/all.min.css`,
  `${process.env.PUBLIC_URL}/assets/admin/css/line-awesome.min.css`,
  'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css',
  `${process.env.PUBLIC_URL}/assets/admin/css/vendor/select2.min.css`,
  `${process.env.PUBLIC_URL}/assets/global/css/iziToast.min.css`,
  `${process.env.PUBLIC_URL}/assets/global/css/iziToast_custom.css`,
  `${process.env.PUBLIC_URL}/assets/admin/css/reset.css`,
  `${process.env.PUBLIC_URL}/assets/admin/css/content.css`,
];

styleHrefs.forEach((href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
});

// Work around ResizeObserver loop errors in some browsers
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
      e.stopImmediatePropagation();
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
