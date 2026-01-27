// src/AdminDashboard/AdminLayout/AdminLayout.jsx

import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/AdminDashboard/AdminNavbar';
import AdminSidebar from '../../components/AdminDashboard/AdminSidebar';
import Footer from '../../components/Footer';

const AdminLayout = () => {
  const navbarHeight = '90px';

  return (
    <div className="d-flex flex-column vh-100">
      <div className="fixed-top" style={{ zIndex: 1030 }}>
        <AdminNavbar />
      </div>

      <div className="d-flex flex-grow-1" style={{ marginTop: navbarHeight }}>
        <div 
          className="position-fixed"
          style={{
            width: '24%',
            height: `calc(100vh - ${navbarHeight})`,
            overflowY: 'auto',
            top: navbarHeight,
            left: 0,
            zIndex: 1020
          }}
        >
          <AdminSidebar />
        </div>

        <div 
          className="flex-grow-1"
          style={{
            marginLeft: '25%',
            width: '75%',
            padding: '1.5rem',
            overflowY: 'auto',
            height: `calc(100vh - ${navbarHeight})`
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