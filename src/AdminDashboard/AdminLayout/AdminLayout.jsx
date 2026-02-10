// src/AdminDashboard/AdminLayout/AdminLayout.jsx

import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import AdminNavbar from '../../components/AdminDashboard/AdminNavbar';
import AdminSidebar from '../../components/AdminDashboard/AdminSidebar';
import Footer from '../../components/Footer';

const AdminLayout = () => {
  const navbarHeight = '90px';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="d-flex flex-column vh-100">
      <div className="fixed-top" style={{ zIndex: 1030 }}>
        <AdminNavbar />
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'fixed',
          top: `calc(${navbarHeight} + 20px)`,
          left: isSidebarOpen ? '24%' : '20px',
          zIndex: 1040,
          backgroundColor: '#54CF17',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(84, 207, 23, 0.4)',
          transition: 'all 0.3s ease'
        }}
      >
        {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      <div className="d-flex flex-grow-1" style={{ marginTop: navbarHeight }}>
        <div 
          className="position-fixed"
          style={{
            width: '24%',
            height: `calc(100vh - ${navbarHeight})`,
            overflowY: 'auto',
            top: navbarHeight,
            left: isSidebarOpen ? 0 : '-25%',
            zIndex: 1020,
            transition: 'left 0.3s ease',
            boxShadow: isSidebarOpen ? '4px 0 12px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <AdminSidebar isOpen={isSidebarOpen} />
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: navbarHeight,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 1010,
              transition: 'opacity 0.3s ease'
            }}
          />
        )}

        <div 
          className="flex-grow-1"
          style={{
            marginLeft: 0,
            width: '100%',
            padding: '1.5rem',
            paddingLeft: '5rem',
            overflowY: 'auto',
            height: `calc(100vh - ${navbarHeight})`,
            transition: 'margin-left 0.3s ease'
          }}
        >
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;