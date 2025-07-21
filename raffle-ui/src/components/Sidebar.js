import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaTicketAlt,
  FaLifeRing,
  FaChartBar,
  FaEnvelope,
  FaCogs,
  FaTools,
  FaChevronDown,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState('');
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? '' : menu);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar h-screen w-64 fixed flex flex-col p-4 shadow-lg">
      <div className="flex items-center gap-3 mb-8 text-2xl font-bold">
        <img src="/assets/images/logoIcon/logo.png" alt="Logo" className="h-10" />
        LottoLab
      </div>

      <nav className="space-y-2 text-sm">
        <SidebarItem icon={<FaTachometerAlt />} label="Dashboard" onClick={() => handleNavigate('/dashboard')} />

        <SidebarItem
          icon={<FaTicketAlt />}
          label="Manage Lottery"
          onClick={() => toggleMenu('lottery')}
          dropdown={openMenu === 'lottery'}
          subItems={['Lotteries', 'Lottery Phases', 'Manual Draw']}
        />
        <SidebarItem
          icon={<FaUsers />}
          label="Manage Users"
          onClick={() => toggleMenu('users')}
          dropdown={openMenu === 'users'}
          badge="!"
          subItems={[
            'Active Users',
            'Banned Users',
            'Email Unverified',
            'Mobile Unverified',
            'KYC Unverified',
            'KYC Pending',
            'With Balance',
            'All Users',
            'Send Notification',
          ]}
        />
        <SidebarItem
          icon={<FaMoneyBillWave />}
          label="Deposits"
          onClick={() => toggleMenu('deposits')}
          dropdown={openMenu === 'deposits'}
          badge="!"
          subItems={[
            'Pending Deposits',
            'Approved Deposits',
            'Successful Deposits',
            'Rejected Deposits',
            'Initiated Deposits',
            'All Deposits',
          ]}
        />
        <SidebarItem
          icon={<FaMoneyBillWave />}
          label="Withdrawals"
          onClick={() => toggleMenu('withdrawals')}
          dropdown={openMenu === 'withdrawals'}
          badge="!"
          subItems={[
            'Pending Withdrawals',
            'Approved Withdrawals',
            'Rejected Withdrawals',
            'All Withdrawals',
          ]}
        />
        <SidebarItem
          icon={<FaLifeRing />}
          label="Support Ticket"
          onClick={() => toggleMenu('support')}
          dropdown={openMenu === 'support'}
          badge="!"
          subItems={[
            'Pending Ticket',
            'Closed Ticket',
            'Answered Ticket',
            'All Ticket',
          ]}
        />
        <SidebarItem
          icon={<FaChartBar />}
          label="Report"
          onClick={() => toggleMenu('report')}
          dropdown={openMenu === 'report'}
          subItems={[
            'Transaction History',
            'Sold Ticket History',
            'Winner History',
            'Commission History',
            'Login History',
            'Notification History',
          ]}
        />
        <SidebarItem icon={<FaEnvelope />} label="Subscribers" />
        <SidebarItem icon={<FaCogs />} label="System Setting" />
        <SidebarItem icon={<FaTools />} label="Extra" />
        <SidebarItem icon={<FaChartBar />} label="Report & Request" />
      </nav>

      <div className="mt-auto text-xs text-gray-400">LOTTOLAB V3.1</div>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick, badge, dropdown, subItems = [] }) => {
  return (
    <div>
      <div
        className="sidebar-item flex justify-between items-center px-3 py-2 rounded-md cursor-pointer transition-colors"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-1">
          {badge && (
            <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {badge}
            </span>
          )}
          {onClick && <FaChevronDown className={`transition-transform ${dropdown ? 'rotate-180' : ''}`} />}
        </div>
      </div>

      {dropdown && subItems.length > 0 && (
        <div className="ml-10 mt-1 space-y-1 text-gray-300">
          {subItems.map((item) => (
            <div key={item} className="hover:text-white cursor-pointer">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
