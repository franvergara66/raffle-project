import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    badgeLevelOne: true,
    subItems: [
      { label: 'Active Users', path: '/users/active' },
      { label: 'Banned Users', path: '/users/banned', badge: '1' },
      { label: 'Email Unverified', path: '/users/email-unverified', badge: '90' },
      { label: 'Mobile Unverified', path: '/users/mobile-unverified', badge: '2' },
      { label: 'KYC Unverified', path: '/users/kyc-unverified', badge: '1877' },
      { label: 'KYC Pending', path: '/users/kyc-pending', badge: '337' },
      { label: 'With Balance', path: '/users/with-balance' },
      { label: 'All Users', path: '/users' },
      { label: 'Send Notification', path: '/users/send-notification' },
    ],
  },
  {
    label: 'Deposits',
    icon: 'las la-file-invoice-dollar',
    badgeLevelOne: true,
    subItems: [
      { label: 'Pending Deposits', path: '/deposit/pending', badge: '84' },
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
    badgeLevelOne: true,
    subItems: [
      { label: 'Pending Withdrawals', path: '/withdraw/pending', badge: '17' },
      { label: 'Approved Withdrawals', path: '/withdraw/approved' },
      { label: 'Rejected Withdrawals', path: '/withdraw/rejected' },
      { label: 'All Withdrawals', path: '/withdraw/all' },
    ],
  },
  {
    label: 'Support Ticket',
    icon: 'la la-ticket',
    badgeLevelOne: true,
    subItems: [
      { label: 'Pending Ticket', path: '/ticket/pending', badge: '50' },
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
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (item, idx) => {
    if (item.subItems) {
      setOpenIndex(openIndex === idx ? null : idx);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleSubClick = (sub) => {
    if (sub.path) {
      navigate(sub.path);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__menu-wrapper" id="sidebar__menuWrapper">
        <ul className="sidebar__menu">
          {menuItems.map((item, idx) => (
            <li
              key={item.label}
              className={`sidebar-menu-item ${item.subItems ? 'sidebar-dropdown' : ''} ${openIndex === idx ? 'open' : ''}`}
            >
              <a
                href="javascript:void(0)"
                className="nav-link"
                onClick={() => handleItemClick(item, idx)}
              >
                <i className={`menu-icon ${item.icon}`}></i>
                <span className="menu-title">{item.label}</span>
                {item.badgeLevelOne && (
                  <span className="menu-badge menu-badge-level-one bg--warning ms-auto">
                    <i className="fas fa-exclamation"></i>
                  </span>
                )}
              </a>
              {item.subItems && (
                <div className={`sidebar-submenu ${openIndex === idx ? 'sidebar-submenu__open' : ''}`}>
                  <ul>
                    {item.subItems.map((sub) => (
                      <li className="sidebar-menu-item" key={sub.label}>
                        <a
                          href="javascript:void(0)"
                          className="nav-link"
                          onClick={() => handleSubClick(sub)}
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
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
