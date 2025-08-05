import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import LotteryList from './pages/lottery/List';
import LotteryCreate from './pages/lottery/Create';
import LotteryEdit from './pages/lottery/Edit';
import LotteryPhases from './pages/lottery/Phases';
import WinBonus from './pages/lottery/WinBonus';
import Profile from './pages/Profile';
import Password from './pages/Password';
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
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

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

        <Route
          path="/lottery"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <LotteryList />
              </ProtectedLayout>
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/lottery/create"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <LotteryCreate />
              </ProtectedLayout>
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/lottery/:id/edit"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <LotteryEdit />
              </ProtectedLayout>
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/lottery/:id/phases"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <LotteryPhases />
              </ProtectedLayout>
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/lottery/:id/bonuses"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <WinBonus />
              </ProtectedLayout>
            ) : (
              <Navigate to="/Login" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <Profile />
              </ProtectedLayout>
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/password"
          element={
            isAuthenticated() ? (
              <ProtectedLayout>
                <Password />
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
