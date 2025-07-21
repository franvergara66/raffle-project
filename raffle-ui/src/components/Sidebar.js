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
    <div className="bg-[#0c1245] text-white h-screen w-64 fixed flex flex-col p-4 shadow-lg">
      <div className="flex items-center gap-3 mb-8 text-2xl font-bold">
        <img src="/assets/images/logoIcon/logo.png" alt="Logo" className="h-10" />
        LottoLab
      </div>

      <nav className="space-y-2 text-sm">
        <SidebarItem icon={<FaTachometerAlt />} label="Dashboard" onClick={() => handleNavigate('/dashboard')} />

        <SidebarItem icon={<FaTicketAlt />} label="Manage Lottery" onClick={() => toggleMenu('lottery')} dropdown={openMenu === 'lottery'} />
        <SidebarItem icon={<FaUsers />} label="Manage Users" onClick={() => toggleMenu('users')} dropdown={openMenu === 'users'} badge="!" />
        <SidebarItem icon={<FaMoneyBillWave />} label="Deposits" badge="!" />
        <SidebarItem icon={<FaMoneyBillWave />} label="Withdrawals" badge="!" />
        <SidebarItem icon={<FaLifeRing />} label="Support Ticket" badge="!" />
        <SidebarItem icon={<FaChartBar />} label="Report" />
        <SidebarItem icon={<FaEnvelope />} label="Subscribers" />
        <SidebarItem icon={<FaCogs />} label="System Setting" />
        <SidebarItem icon={<FaTools />} label="Extra" />
        <SidebarItem icon={<FaChartBar />} label="Report & Request" />
      </nav>

      <div className="mt-auto text-xs text-gray-400">LOTTOLAB V3.1</div>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick, badge, dropdown }) => {
  return (
    <div>
      <div
        className="flex justify-between items-center px-3 py-2 rounded-md cursor-pointer hover:bg-[#1e2a78] transition-colors"
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

      {dropdown && (
        <div className="ml-10 mt-1 space-y-1 text-gray-300">
          <div className="hover:text-white cursor-pointer">Sub Opción 1</div>
          <div className="hover:text-white cursor-pointer">Sub Opción 2</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
