// src/components/AdminDashboard/AdminNavbar.jsx

import Icon1 from '../../assets/AgentDashboard/Navbar/Icon1.png';
import Icon2 from '../../assets/AgentDashboard/Navbar/Icon2.png';
import logo from '../../assets/total-needs-logo.png';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    const logoutRoute = authService.logout();
    navigate(logoutRoute);
  };

  const user = authService.getUserRole();

  return (
    <div className="border" style={{ borderColor: '#929292', backgroundColor: '#FFFFFF' }}>
      <div className="container-fluid">
        <div className="row align-items-center py-2 px-3">
          <div className="col-4 col-sm-4 col-md-4 col-lg-3">
            <img src={logo} alt="Mdigimart" style={{ height: '6rem' }} />
          </div>

          <div className="col-8 col-sm-8 col-md-8 col-lg-9">
            <div className="d-flex align-items-center justify-content-end gap-3">
              <div className="d-none d-md-flex">
                <img 
                  src={Icon1} 
                  alt="Icon 1" 
                  style={{ width: '25px', height: '25px', opacity: 1 }}
                />
              </div>

              <div 
                className="d-flex align-items-center gap-2 px-4 py-1"
                style={{
                  backgroundColor: '#F2F2F2',
                  border: '1px solid #929292',
                  borderRadius: '50px',
                  minWidth: '190px',
                  height: '55px',
                  opacity: 1
                }}
              >
                <div className="d-flex align-items-center">
                  <img 
                    src={Icon2} 
                    alt="Admin Icon" 
                    style={{ width: '25px', height: '25px', opacity: 1 }}
                  />
                </div>

                <div className="d-flex flex-column justify-content-center">
                  <p className="mb-0 small text-uppercase" style={{ fontSize: '0.75rem' }}>
                    ADMIN PANEL
                  </p>
                  <p className="mb-0 text-dark fw-bold" style={{ fontSize: '1.1rem' }}>
                    Dashboard
                  </p>
                </div>
              </div>

              <div 
                className="d-flex align-items-center gap-2"
                style={{
                  width: '13rem',
                  height: '3.75rem',
                  opacity: 1
                }}
              >
                <div 
                  style={{
                    width: '3.625rem',
                    height: '3.625rem',
                    backgroundColor: '#D9D9D9',
                    borderRadius: '50%',
                    opacity: 1
                  }}
                />

                <div className="d-flex flex-column justify-content-center">
                  <p 
                    className="mb-0"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '1.25rem',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      color: '#000000'
                    }}
                  >
                    Admin User
                  </p>
                  <p 
                    className="mb-0 text-gray-20"
                    style={{
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      color: '#dc2626'
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;