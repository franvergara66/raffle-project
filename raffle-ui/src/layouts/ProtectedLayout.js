import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const ProtectedLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ width: '100%' }}>
        <Navbar />
        <main
          style={{
            marginLeft: '250px',
            width: 'calc(100% - 250px)',
            padding: '1rem',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
