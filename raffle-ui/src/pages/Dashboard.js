import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AdminNotifications from '../components/AdminNotifications';

function Dashboard() {
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

  const general = {
    cur_sym: '$',
    cur_text: 'USD',
    last_cron: new Date().toISOString(),
  };

  const payment = {
    total_deposit_amount: 0,
    total_deposit_charge: 0,
    total_deposit_pending: 0,
  };

  const paymentWithdraw = {
    total_withdraw_amount: 0,
    total_withdraw_charge: 0,
    total_withdraw_pending: 0,
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
        }
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      }
    };
    fetchStats();
  }, []);

/*   useEffect(() => {
    toast.info('Test toast - should stay visible for 10 seconds', {
      autoClose: 10000,
      pauseOnHover: true,
      closeOnClick: true,
    });
  }, []); */

  const boxes = [
    { color: 'bg--primary', icon: 'fa-users', label: 'Total Users', value: stats.totalUsers },
    { color: 'bg--success', icon: 'fa-user-check', label: 'Verified Users', value: stats.verifiedUsers },
    { color: 'bg--warning', icon: 'fa-envelope', label: 'Email Unverified', value: stats.emailUnverifiedUsers },
    { color: 'bg--danger', icon: 'fa-sms', label: 'SMS Unverified', value: stats.smsUnverifiedUsers },
    { color: 'bg--info', icon: 'fa-ticket-alt', label: 'Sell Ticket', value: stats.totalSellTicket },
    { color: 'bg--indigo', icon: 'fa-money-bill', label: 'Sell Amount', value: stats.totalSellAmount },
    { color: 'bg--teal', icon: 'fa-trophy', label: 'Winners', value: stats.totalWinner },
    { color: 'bg--pink', icon: 'fa-gift', label: 'Win Amount', value: stats.totalWinAmount },
  ];

  const diffMin = Math.floor((Date.now() - new Date(general.last_cron).getTime()) / 60000);
  const showCronModal = diffMin > 15;

  return (
    <div className="bodywrapper__inner">
      {showCronModal && (
        <div className="modal show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cron Job Setting Instruction</h5>
              </div>
              <div className="modal-body">
                <p>Please configure the cron job to run every few minutes.</p>
                <div className="input-group">
                  <input type="text" readOnly className="form-control" value="curl -s /cron" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex mb-30 flex-wrap gap-3 justify-content-between align-items-center">
        <h6 className="page-title">Dashboard</h6>
        <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center breadcrumb-plugins">
          <button
            className="btn btn-outline--primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#cronModal"
          >
            <i className="las la-server"></i>
            Cron Setup
          </button>
        </div>
      </div>

      <div className="row gy-4">
        {boxes.map((b) => (
          <div key={b.label} className="col-xxl-3 col-sm-6">
            <div className={`widget-seven ${b.color}`}>
              <div className="widget-seven__content">
                <span className="widget-seven__content-icon">
                  <span className="icon">
                    <i className={`las ${b.icon}`}></i>
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

      <div className="row gy-4 mt-4">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Monthly Deposit & Withdraw Report</h5>
              <p className="mb-0">Chart disabled</p>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row gy-4">
            <div className="col-sm-6">
              <div className="widget-three box--shadow2 b-radius--5 bg--success text-white">
                <div className="widget-three__content">
                  <h2 className="numbers text-white">
                    {payment.total_deposit_amount} {general.cur_text}
                  </h2>
                  <p className="text--small">Total Deposit</p>
                  <h2 className="numbers text-white mt-2">
                    {payment.total_deposit_charge} {general.cur_text}
                  </h2>
                  <p className="text--small">Total Deposit Charge</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="widget-three box--shadow2 b-radius--5 bg--danger text-white">
                <div className="widget-three__content">
                  <h2 className="numbers text-white">
                    {paymentWithdraw.total_withdraw_amount} {general.cur_text}
                  </h2>
                  <p className="text--small">Total Withdraw</p>
                  <h2 className="numbers text-white mt-2">
                    {paymentWithdraw.total_withdraw_charge} {general.cur_text}
                  </h2>
                  <p className="text--small">Total Withdraw Charge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminNotifications />
    </div>
  );
}

export default Dashboard;
