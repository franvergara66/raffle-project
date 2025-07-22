import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const menuData = [
  {
    label: 'Dashboard',
    icon: 'las la-home',
    to: '/dashboard',
  },
  {
    label: 'Manage Lottery',
    icon: 'las la-ticket-alt',
    subItems: [
      { label: 'Lotteries', to: '/lottery' },
      { label: 'Lottery Phases', to: '/lottery/phases' },
      { label: 'Manual Draw', to: '/lottery/draw' },
    ],
  },
  {
    label: 'Manage Users',
    icon: 'las la-users',
    badge: true,
    subItems: [
      { label: 'Active Users', to: '/users/active' },
      { label: 'Banned Users', to: '/users/banned', badge: 1 },
      { label: 'Email Unverified', to: '/users/email-unverified', badge: 90 },
      { label: 'Mobile Unverified', to: '/users/mobile-unverified', badge: 2 },
      { label: 'KYC Unverified', to: '/users/kyc-unverified', badge: 1877 },
      { label: 'KYC Pending', to: '/users/kyc-pending', badge: 337 },
      { label: 'With Balance', to: '/users/with-balance' },
      { label: 'All Users', to: '/users' },
      { label: 'Send Notification', to: '/users/send-notification' },
    ],
  },
  {
    label: 'Deposits',
    icon: 'las la-file-invoice-dollar',
    badge: true,
    subItems: [
      { label: 'Pending Deposits', to: '/deposit/pending', badge: 84 },
      { label: 'Approved Deposits', to: '/deposit/approved' },
      { label: 'Successful Deposits', to: '/deposit/successful' },
      { label: 'Rejected Deposits', to: '/deposit/rejected' },
      { label: 'Initiated Deposits', to: '/deposit/initiated' },
      { label: 'All Deposits', to: '/deposit/all' },
    ],
  },
  {
    label: 'Withdrawals',
    icon: 'la la-bank',
    badge: true,
    subItems: [
      { label: 'Pending Withdrawals', to: '/withdraw/pending', badge: 17 },
      { label: 'Approved Withdrawals', to: '/withdraw/approved' },
      { label: 'Rejected Withdrawals', to: '/withdraw/rejected' },
      { label: 'All Withdrawals', to: '/withdraw/all' },
    ],
  },
  {
    label: 'Support Ticket',
    icon: 'la la-ticket',
    badge: true,
    subItems: [
      { label: 'Pending Ticket', to: '/ticket/pending', badge: 50 },
      { label: 'Closed Ticket', to: '/ticket/closed' },
      { label: 'Answered Ticket', to: '/ticket/answered' },
      { label: 'All Ticket', to: '/ticket' },
    ],
  },
  {
    label: 'Report',
    icon: 'la la-list',
    subItems: [
      { label: 'Transaction History', to: '/report/transaction' },
      { label: 'Sold Ticket History', to: '/report/lottery/tickets' },
      { label: 'Winner History', to: '/report/winners' },
      { label: 'Commission History', to: '/report/commissions' },
      { label: 'Login History', to: '/report/login/history' },
      { label: 'Notification History', to: '/report/notification/history' },
    ],
  },
  {
    label: 'Subscribers',
    icon: 'las la-thumbs-up',
    to: '/subscriber',
  },
  {
    label: 'System Setting',
    icon: 'las la-life-ring',
    to: '/system-setting',
  },
  {
    label: 'Extra',
    icon: 'la la-server',
    subItems: [
      { label: 'Application', to: '/system/info' },
      { label: 'Server', to: '/system/server-info' },
      { label: 'Cache', to: '/system/optimize' },
      { label: 'Update', to: '/system/system-update' },
    ],
  },
  {
    label: 'Report & Request',
    icon: 'las la-bug',
    to: '/request-report',
  },
];

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState('');
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? '' : menu);
  };

  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="sidebar">
      <div id="sidebar__menuWrapper" className="sidebar__menu-wrapper">
        <ul className="sidebar__menu">
          {menuData.map((item, idx) => (
            <MenuItem
              key={idx}
              item={item}
              open={openMenu === idx}
              onToggle={() => toggleMenu(idx)}
              onNavigate={handleNavigate}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const MenuItem = ({ item, open, onToggle, onNavigate }) => {
  if (item.subItems) {
    return (
      <li className={`sidebar-menu-item sidebar-dropdown ${open ? 'open' : ''}`}>
        <button
          type="button"
          onClick={onToggle}
          className={open ? 'side-menu--open' : ''}
        >
          <i className={`menu-icon ${item.icon}`}></i>
          <span className="menu-title">{item.label}</span>
          {item.badge && (
            <span className="menu-badge menu-badge-level-one bg--warning ms-auto">
              <i className="fas fa-exclamation"></i>
            </span>
          )}
        </button>
        <div className={`sidebar-submenu ${open ? 'sidebar-submenu__open' : ''}`}>
          <ul>
            {item.subItems.map((sub, idx) => (
              <li key={idx} className="sidebar-menu-item">
                <button
                  type="button"
                  onClick={() => onNavigate(sub.to)}
                  className="nav-link"
                >
                  <i className="menu-icon las la-dot-circle"></i>
                  <span className="menu-title">{sub.label}</span>
                  {sub.badge && (
                    <span className="menu-badge bg--info ms-auto">{sub.badge}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li className="sidebar-menu-item">
      <button type="button" onClick={() => onNavigate(item.to)} className="nav-link">
        <i className={`menu-icon ${item.icon}`}></i>
        <span className="menu-title">{item.label}</span>
      </button>
    </li>
  );
};

export default Sidebar;
