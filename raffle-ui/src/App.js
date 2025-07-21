import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedLayout from './layouts/ProtectedLayout';

// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<Navigate to="/Dashboard" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
