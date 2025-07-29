import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'admin' };

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/admin-notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        }
      } catch (err) {
        console.error('Error fetching notifications', err);
      }
    };

    fetchNotifications();
  }, []);

  const notificationCount =
    notifications.length > 9 ? '9+' : notifications.length;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar-wrapper bg--dark d-flex flex-wrap">
      <div className="navbar__left">
        <button type="button" className="res-sidebar-open-btn me-3">
          <i className="las la-bars"></i>
        </button>
        <form className="navbar-search">
          <input
            type="search"
            name="#0"
            className="navbar-search-field"
            id="searchInput"
            autoComplete="off"
            placeholder="Search here..."
          />
          <i className="las la-search"></i>
          <ul className="search-list"></ul>
        </form>
      </div>
      <div className="navbar__right">
        <ul className="navbar__action-list">
          <li>
            <button
              type="button"
              className="primary--layer"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              aria-label="Visit Website"
              data-bs-original-title="Visit Website"
            >
              <a href="https://script.viserlab.com/lottolab" target="_blank" rel="noreferrer">
                <i className="las la-globe"></i>
              </a>
            </button>
          </li>
          <li className="dropdown">
            <button
              type="button"
              className="primary--layer notification-bell"
              data-bs-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                aria-label="Unread Notifications"
                data-bs-original-title="Unread Notifications"
              >
                <i className="las la-bell  icon-left-right "></i>
              </span>
              <span className="notification-count">{notificationCount}</span>
            </button>
            <div className="dropdown-menu dropdown-menu--md p-0 border-0 box--shadow1 dropdown-menu-right">
              <div className="dropdown-menu__header">
                <span className="caption">Notification</span>
                <p>You have {notifications.length} unread notification</p>
              </div>
              <div className="dropdown-menu__body ">
                {notifications.map((n) => (
                  <a key={n.id} href="#" className="dropdown-menu__item">
                    <div className="navbar-notifi">
                      <div className="navbar-notifi__right">
                        <h6 className="notifi__title">{n.message}</h6>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="dropdown-menu__footer">
                <a href="#" className="view-all-message">
                  View all notifications
                </a>
              </div>
            </div>
          </li>
          <li>
            <button
              type="button"
              className="primary--layer"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              aria-label="System Setting"
              data-bs-original-title="System Setting"
            >
              <a href="https://script.viserlab.com/lottolab/admin/system-setting">
                <i className="las la-wrench"></i>
              </a>
            </button>
          </li>
          <li className="dropdown d-flex profile-dropdown">
            <button
              type="button"
              data-bs-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="navbar-user">
                <span className="navbar-user__thumb">
                  <img
                    src="https://script.viserlab.com/lottolab/assets/admin/images/profile/66619f5b5c6091717673819.png"
                    alt="profile"
                  />
                </span>
                <span className="navbar-user__info">
                  <span className="navbar-user__name">{user.name}</span>
                </span>
                <span className="icon">
                  <i className="las la-chevron-circle-down"></i>
                </span>
              </span>
            </button>
            <div className="dropdown-menu dropdown-menu--sm p-0 border-0 box--shadow1 dropdown-menu-right">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="dropdown-menu__item d-flex align-items-center px-3 py-2"
              >
                <i className="dropdown-menu__icon las la-user-circle"></i>
                <span className="dropdown-menu__caption">Profile</span>
              </button>

              <a href="#" className="dropdown-menu__item d-flex align-items-center px-3 py-2">
                <i className="dropdown-menu__icon las la-key"></i>
                <span className="dropdown-menu__caption">Password</span>
              </a>

              <button type="button" onClick={handleLogout} className="dropdown-menu__item d-flex align-items-center px-3 py-2">
                <i className="dropdown-menu__icon las la-sign-out-alt"></i>
                <span className="dropdown-menu__caption">Logout</span>
              </button>
            </div>
            <button type="button" className="breadcrumb-nav-open ms-2 d-none">
              <i className="las la-sliders-h"></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

