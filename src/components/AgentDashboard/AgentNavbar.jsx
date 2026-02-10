// src/components/AgentDashboard/AgentNavbar.jsx

import Icon1 from '../../assets/AgentDashboard/Navbar/Icon1.png';
import Icon2 from '../../assets/AgentDashboard/Navbar/Icon2.png';
import logo from '../../assets/total-needs-logo.png';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const AgentNavbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    const logoutRoute = authService.logout();
    navigate(logoutRoute);
  };

  return (
    <div className="border" style={{ borderColor: '#929292', backgroundColor: '#FFFFFF' }}>
      <div className="container-fluid">
        <div className="row align-items-center py-2 px-3">
          {/* Left Side - Logo */}
          <div className="col-4 col-sm-4 col-md-4 col-lg-3">
            <img src={logo} alt="Total Needs" style={{ height: '6rem' }} />
          </div>

          {/* Right Side - Icons and Wallet */}
          <div className="col-8 col-sm-8 col-md-8 col-lg-9">
            <div className="d-flex align-items-center justify-content-end gap-3">
              {/* Icon 1 */}
              <div className="d-none d-md-flex">
                <img
                  src={Icon1}
                  alt="Icon 1"
                  style={{ width: '25px', height: '25px', opacity: 1 }}
                />
              </div>

              {/* Wallet Balance Container */}
              <div
                className="d-flex align-items-center gap-2 px-3 py-2"
                style={{
                  backgroundColor: '#F2F2F2',
                  border: '1px solid #929292',
                  borderRadius: '50px',
                  minWidth: '190px',
                  height: '55px',
                  opacity: 1
                }}
              >
                {/* Icon 2 */}
                <div className="d-flex align-items-center">
                  <img
                    src={Icon2}
                    alt="Wallet Icon"
                    style={{ width: '25px', height: '25px', opacity: 1 }}
                  />
                </div>

                {/* Wallet Info */}
                <div className="d-flex flex-column justify-content-center">
                  <p className="mb-0 small text-uppercase" style={{ fontSize: '0.75rem' }}>
                    WALLET BALANCE
                  </p>
                  <p className="mb-0 text-dark fw-bold" style={{ fontSize: '1.1rem' }}>
                    ₹ 80,000
                  </p>
                </div>
              </div>

              {/* User Profile Container */}
              <div
                className="d-flex align-items-center gap-2"
                style={{
                  width: '13rem', /* 208px */
                  height: '3.75rem', /* 60px */
                  opacity: 1
                }}
              >
                {/* User Avatar */}
                <div
                  style={{
                    width: '3.625rem', /* 58px */
                    height: '3.625rem', /* 58px */
                    backgroundColor: '#D9D9D9',
                    borderRadius: '50%',
                    opacity: 1
                  }}
                />

                {/* User Info */}
                <div className="d-flex flex-column justify-content-center">
                  <p
                    className="mb-0"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '1.25rem', /* 20px */
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      color: '#000000'
                    }}
                  >
                    Rajesh Kumar
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

      {/* Custom Responsive Styles */}
      <style jsx="true">{`
        @media (max-width: 767.98px) {
          h1 {
            font-size: 1.5rem;
          }
          
          .gap-3 {
            gap: 0.5rem !important;
          }
          
          div[style*="minHeight"] {
            min-height: 60px !important;
            padding: 0.5rem 1rem !important;
          }
          
          div[style*="minHeight"] img {
            width: 28px !important;
            height: 28px !important;
          }
          
          div[style*="minHeight"] p:first-child {
            font-size: 0.65rem !important;
          }
          
          div[style*="minHeight"] p:last-child {
            font-size: 0.9rem !important;
          }

          /* Hide user profile on mobile */
          div[style*="13rem"] {
            display: none !important;
          }
        }

        @media (max-width: 575.98px) {
          h1 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AgentNavbar;