import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Sesión cerrada con éxito');
    navigate('/Login');
  };

  // Obtener el usuario desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="wrapper">
      {/* NAVBAR */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <span className="nav-link">Hola, <strong>{user?.name}</strong></span>
          </li>
          <li className="nav-item">
            <button onClick={logout} className="btn btn-danger ml-2">Logout</button>
          </li>
        </ul>
      </nav>

      {/* SIDEBAR */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" className="brand-link">
          <span className="brand-text font-weight-light">AdminLTE React</span>
        </a>
        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column">
              <li className="nav-item">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* CONTENIDO */}
      <div className="content-wrapper p-4">
        <h2>Bienvenido, {user?.name} 👋</h2>
        <p>Acá puedes agregar tus gráficos, tablas, etc.</p>
      </div>
    </div>
  );
}

export default Dashboard;
