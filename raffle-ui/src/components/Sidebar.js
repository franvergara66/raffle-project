import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'las la-home',
    path: '/dashboard',
  },
  {
    label: 'Manage Lottery',
    icon: 'las la-ticket-alt',
    subItems: [
      { label: 'Lotteries', path: '/lottery' },
      { label: 'Lottery Phases', path: '/lottery/phases' },
      { label: 'Manual Draw', path: '/lottery/draw' },
    ],
  },
  {
    label: 'Manage Users',
    icon: 'las la-users',
    badge: '!',
    subItems: [
      { label: 'Active Users', path: '/users/active' },
      { label: 'Banned Users', path: '/users/banned', badge: 1 },
      { label: 'Email Unverified', path: '/users/email-unverified', badge: 90 },
      { label: 'Mobile Unverified', path: '/users/mobile-unverified', badge: 2 },
      { label: 'KYC Unverified', path: '/users/kyc-unverified', badge: 1877 },
      { label: 'KYC Pending', path: '/users/kyc-pending', badge: 337 },
      { label: 'With Balance', path: '/users/with-balance' },
      { label: 'All Users', path: '/users' },
      { label: 'Send Notification', path: '/users/send-notification' },
    ],
  },
  {
    label: 'Deposits',
    icon: 'las la-file-invoice-dollar',
    badge: '!',
    subItems: [
      { label: 'Pending Deposits', path: '/deposit/pending', badge: 84 },
      { label: 'Approved Deposits', path: '/deposit/approved' },
      { label: 'Successful Deposits', path: '/deposit/successful' },
      { label: 'Rejected Deposits', path: '/deposit/rejected' },
      { label: 'Initiated Deposits', path: '/deposit/initiated' },
      { label: 'All Deposits', path: '/deposit/all' },
    ],
  },
  {
    label: 'Withdrawals',
    icon: 'la la-bank',
    badge: '!',
    subItems: [
      { label: 'Pending Withdrawals', path: '/withdraw/pending', badge: 17 },
      { label: 'Approved Withdrawals', path: '/withdraw/approved' },
      { label: 'Rejected Withdrawals', path: '/withdraw/rejected' },
      { label: 'All Withdrawals', path: '/withdraw/all' },
    ],
  },
  {
    label: 'Support Ticket',
    icon: 'la la-ticket',
    badge: '!',
    subItems: [
      { label: 'Pending Ticket', path: '/ticket/pending', badge: 50 },
      { label: 'Closed Ticket', path: '/ticket/closed' },
      { label: 'Answered Ticket', path: '/ticket/answered' },
      { label: 'All Ticket', path: '/ticket' },
    ],
  },
  {
    label: 'Report',
    icon: 'la la-list',
    subItems: [
      { label: 'Transaction History', path: '/report/transaction' },
      { label: 'Sold Ticket History', path: '/report/lottery/tickets' },
      { label: 'Winner History', path: '/report/winners' },
      { label: 'Commission History', path: '/report/commissions' },
      { label: 'Login History', path: '/report/login/history' },
      { label: 'Notification History', path: '/report/notification/history' },
    ],
  },
  {
    label: 'Subscribers',
    icon: 'las la-thumbs-up',
    path: '/subscriber',
  },
  {
    label: 'System Setting',
    icon: 'las la-life-ring',
    path: '/system-setting',
  },
  {
    label: 'Extra',
    icon: 'la la-server',
    subItems: [
      { label: 'Application', path: '/system/info' },
      { label: 'Server', path: '/system/server-info' },
      { label: 'Cache', path: '/system/optimize' },
      { label: 'Update', path: '/system/system-update' },
    ],
  },
  {
    label: 'Report & Request',
    icon: 'las la-bug',
    path: '/request-report',
  },
];

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item) => {
    if (item.subItems) {
      setOpenMenu(openMenu === item.label ? '' : item.label);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="sidebar h-screen w-64 fixed flex flex-col p-4 shadow-lg">
      <div className="flex items-center gap-3 mb-8 text-2xl font-bold">
        <img src="/assets/images/logoIcon/logo.png" alt="Logo" className="h-10" />
        LottoLab
      </div>

      <div className="sidebar__menu-wrapper">
        <ul className="sidebar__menu">
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              item={item}
              isOpen={openMenu === item.label}
              onClick={() => handleClick(item)}
              navigate={navigate}
              activePath={location.pathname}
            />
          ))}
        </ul>
      </div>

      <div className="mt-auto text-xs text-gray-400">LOTTOLAB V3.1</div>
    </div>
  );
};

const MenuItem = ({ item, isOpen, onClick, navigate, activePath }) => {
  const hasChildren = item.subItems && item.subItems.length > 0;
  const isActive = item.path && item.path === activePath;

  return (
    <li className={`sidebar-menu-item ${hasChildren ? 'sidebar-dropdown' : ''} ${isOpen ? 'open' : ''} ${isActive ? 'active' : ''}`}>
      <a
        href={item.path || '#'}
        className={`nav-link ${isOpen ? 'side-menu--open' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <i className={`menu-icon ${item.icon}`}></i>
        <span className="menu-title">{item.label}</span>
        {item.badge && typeof item.badge === 'string' && (
          <span className="menu-badge menu-badge-level-one bg--warning ms-auto">
            <i className="fas fa-exclamation"></i>
          </span>
        )}
      </a>

      {hasChildren && (
        <div className={`sidebar-submenu ${isOpen ? 'sidebar-submenu__open' : ''}`}>
          <ul>
            {item.subItems.map((sub) => (
              <li key={sub.label} className={`sidebar-menu-item ${sub.path === activePath ? 'active' : ''}`}>
                <a
                  href={sub.path || '#'}
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (sub.path) navigate(sub.path);
                  }}
                >
                  <i className="menu-icon las la-dot-circle"></i>
                  <span className="menu-title">{sub.label}</span>
                  {sub.badge && (
                    <span className="menu-badge bg--info ms-auto">{sub.badge}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default Sidebar;
