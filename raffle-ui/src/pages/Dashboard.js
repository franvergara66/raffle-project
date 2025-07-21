import React, { useEffect, useState } from 'react';
import AdminNotifications from '../components/AdminNotifications';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    emailUnverifiedUsers: 0,
    smsUnverifiedUsers: 0,
    totalSellTicket: 0,
    totalSellAmount: 0,
    totalWinner: 0,
    totalWinAmount: 0,
  });

  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Sesión cerrada con éxito');
    navigate('/Login');
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          // Datos de ejemplo en caso de error o ausencia de API
          setStats({
            totalUsers: 120,
            verifiedUsers: 80,
            emailUnverifiedUsers: 15,
            smsUnverifiedUsers: 5,
            totalSellTicket: 1500,
            totalSellAmount: 20000,
            totalWinner: 30,
            totalWinAmount: 5000,
          });
        }
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      }
    };

    fetchStats();
  }, []);

  const boxes = [
    { color: 'bg-primary', icon: 'fa-users', label: 'Total Users', value: stats.totalUsers },
    { color: 'bg-success', icon: 'fa-user-check', label: 'Verified Users', value: stats.verifiedUsers },
    { color: 'bg-warning', icon: 'fa-envelope', label: 'Email Unverified', value: stats.emailUnverifiedUsers },
    { color: 'bg-danger', icon: 'fa-sms', label: 'SMS Unverified', value: stats.smsUnverifiedUsers },
    { color: 'bg-info', icon: 'fa-ticket-alt', label: 'Sell Ticket', value: stats.totalSellTicket },
    { color: 'bg-indigo', icon: 'fa-money-bill', label: 'Sell Amount', value: stats.totalSellAmount },
    { color: 'bg-teal', icon: 'fa-trophy', label: 'Winners', value: stats.totalWinner },
    { color: 'bg-pink', icon: 'fa-gift', label: 'Win Amount', value: stats.totalWinAmount },
  ];

  return (
    <div className="content-wrapper p-4">
      <nav className="navbar navbar-expand navbar-white navbar-light mb-4">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3">Hola, <strong>{user?.name}</strong></li>
          <li className="nav-item">
            <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
          </li>
        </ul>
      </nav>

      <div className="row">
        {boxes.map((b) => (
          <div key={b.label} className="col-lg-3 col-sm-6 mb-4">
            <div className={`widget-seven ${b.color}`}>
              <div className="widget-seven__content">
                <span className="widget-seven__content-icon">
                  <span className="icon">
                    <i className={`fas ${b.icon}`}></i>
                  </span>
                </span>
                <div className="widget-seven__description">
                  <p className="widget-seven__content-title">{b.label}</p>
                  <h3 className="widget-seven__content-amount">{b.value}</h3>
                </div>
              </div>
              <span className="widget-seven__arrow">
                <i className="fas fa-chevron-right"></i>
              </span>
            </div>
          </div>
        ))}
      </div>

      <AdminNotifications />
    </div>
  );
}

export default Dashboard;
