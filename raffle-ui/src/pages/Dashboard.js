import React, { useEffect, useRef, useState } from 'react';
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

  // example additional data similar to the PHP dashboard
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

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const depositMonth = [12, 19, 3, 5, 2, 3, 10, 11, 6, 8, 12, 7];
  const withdrawMonth = [2, 3, 20, 5, 1, 4, 8, 6, 9, 7, 5, 3];

  const depositDay = Array.from({ length: 30 }, (_, i) => `D${i + 1}`);
  const depositDayAmount = depositDay.map(() => Math.floor(Math.random() * 10) + 1);
  const withdrawDayAmount = depositDay.map(() => Math.floor(Math.random() * 10) + 1);

  const browserData = { Chrome: 100, Firefox: 40, Safari: 25, Other: 10 };
  const osData = { Windows: 80, Mac: 40, Linux: 20, Other: 5 };
  const countryData = { USA: 50, UK: 30, Spain: 20, Other: 10 };

  const barChartRef = useRef(null);
  const depositLineRef = useRef(null);
  const withdrawLineRef = useRef(null);
  const browserRef = useRef(null);
  const osRef = useRef(null);
  const countryRef = useRef(null);
  const [chartsRendered, setChartsRendered] = useState(false);

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

  useEffect(() => {
    if (!chartsRendered && window.Chart) {
      new window.Chart(barChartRef.current.getContext('2d'), {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            { label: 'Deposit', data: depositMonth, backgroundColor: '#0d6efd' },
            { label: 'Withdraw', data: withdrawMonth, backgroundColor: '#dc3545' },
          ],
        },
      });

      new window.Chart(depositLineRef.current.getContext('2d'), {
        type: 'line',
        data: {
          labels: depositDay,
          datasets: [{ label: 'Deposit', data: depositDayAmount, borderColor: '#0d6efd', fill: false }],
        },
      });

      new window.Chart(withdrawLineRef.current.getContext('2d'), {
        type: 'line',
        data: {
          labels: depositDay,
          datasets: [{ label: 'Withdraw', data: withdrawDayAmount, borderColor: '#dc3545', fill: false }],
        },
      });

      new window.Chart(browserRef.current.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: Object.keys(browserData),
          datasets: [{ data: Object.values(browserData), backgroundColor: ['#ff7675', '#6c5ce7', '#ffa62b', '#ffeaa7'] }],
        },
      });

      new window.Chart(osRef.current.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: Object.keys(osData),
          datasets: [{ data: Object.values(osData), backgroundColor: ['#0dcaf0', '#198754', '#ffc107', '#dc3545'] }],
        },
      });

      new window.Chart(countryRef.current.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: Object.keys(countryData),
          datasets: [{ data: Object.values(countryData), backgroundColor: ['#6610f2', '#20c997', '#fd7e14', '#6f42c1'] }],
        },
      });

      setChartsRendered(true);
    }
  }, [chartsRendered]);

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
              <canvas ref={barChartRef} height="300"></canvas>
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

      <div className="row gy-4 mt-4">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Last 30 days Deposit History</h5>
              <canvas ref={depositLineRef} height="300"></canvas>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Last 30 days Withdraw History</h5>
              <canvas ref={withdrawLineRef} height="300"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="row gy-4 mt-4">
        <div className="col-xl-4 col-lg-6">
          <div className="card overflow-hidden">
            <div className="card-body">
              <h5 className="card-title">Login By Browser</h5>
              <canvas ref={browserRef} height="274"></canvas>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Login By OS</h5>
              <canvas ref={osRef} height="274"></canvas>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Login By Country</h5>
              <canvas ref={countryRef} height="274"></canvas>
            </div>
          </div>
        </div>
      </div>

      <AdminNotifications />
    </div>
  );
}

export default Dashboard;
