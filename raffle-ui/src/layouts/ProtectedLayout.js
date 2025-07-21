import React from 'react';
import Sidebar from '../components/Sidebar';

const ProtectedLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '16rem', padding: '1rem', width: '100%' }}>
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
