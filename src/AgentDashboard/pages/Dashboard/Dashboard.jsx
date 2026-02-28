// src/AgentDashboard/pages/Dashboard/Dashboard.jsx

// Import images
import Icon1 from '../../../assets/AgentDashboard/Dashboard/Icon1.png';
import Icon2 from '../../../assets/AgentDashboard/Dashboard/Icon2.png';
import Icon3 from '../../../assets/AgentDashboard/Dashboard/Icon3.png';
import Icon4 from '../../../assets/AgentDashboard/Dashboard/Icon4.png';
import Icon5 from '../../../assets/AgentDashboard/Dashboard/Icon5.png';
import Icon6 from '../../../assets/AgentDashboard/Dashboard/Icon6.png';
import SidebarIcon2 from '../../../assets/AgentDashboard/Sidebar/Icon2.png';
import SidebarIcon3 from '../../../assets/AgentDashboard/Sidebar/Icon3.png';
import CustomerOrdersCards from './CustomerOrderCards';
import DashboardOverview from './DashboardOverview';

const Dashboard = () => {
  // Alert Notifications
  const alerts = [
    {
      bg: '#FEFCE8',
      border: '#8D8213',
      text: 'Farmer Payout Pending for Order #2415',
      buttonText: 'View Order',
      buttonColor: '#8D8213'
    },
    {
      bg: '#EFF6FF',
      border: '#0F468C',
      text: 'Customer delivery confirmation awaited (Order #2345)',
      buttonText: 'Track',
      buttonColor: '#0F468C'
    }
  ];

  // Stats Cards
  const statsCards = [
    {
      borderColor: '#EC5B13',
      title: 'New Orders',
      icon: Icon1,
      iconBg: '#EC5B133B',
      number: '15',
      subtitle: 'Customer Request'
    },
    {
      borderColor: '#AA871B',
      title: 'To purchase',
      icon: SidebarIcon2,
      iconBg: '#FEFCE8',
      number: '5',
      subtitle: 'pending actions'
    },
    {
      borderColor: '#3B82F6',
      title: 'In Transit',
      icon: Icon2,
      iconBg: '#EFF6FF',
      number: '6',
      subtitle: 'Active deliveries'
    },
    {
      borderColor: '#A855F7',
      title: 'Farmer payout',
      icon: Icon1,
      iconBg: '#FAF5FF',
      number: '₹ 80000',
      subtitle: 'Active deliveries'
    },
    {
      borderColor: '#88DB15',
      title: 'Margin earned',
      icon: Icon3,
      iconBg: '#E6F6CF',
      number: '₹ 80000',
      subtitle: 'This Month'
    }
  ];

  // Quick Action Cards
  const quickActions = [
    { icon: SidebarIcon2, title: 'Buy From Farmers' },
    { icon: SidebarIcon3, title: 'Place Orders' }
  ];

  // Order Lifecycle
  const orderLifecycle = [
    { icon: Icon4, bg: '#EC5B13', border: 'none', title: 'Customer Order' },
    { icon: null, bg: '#EC5B13', border: 'none', title: 'Agent purchase' },
    { icon: Icon5, bg: '#EC5B136B', border: '1px solid #EC5B13', title: 'In Transit' },
    { icon: Icon2, bg: '#E8E8E8', border: '1px solid #B3B3B3', title: 'Delivery' },
    { icon: Icon1, bg: '#E8E8E8', border: '1px solid #B3B3B3', title: 'Farmer payment' },
    { icon: Icon6, bg: '#E8E8E8', border: '1px solid #B3B3B3', title: 'Closed' }
  ];

  return (
    <div className="container-fluid px-4 py-3">
      {/* Alert Notifications */}
      <div className="row mb-4 g-3">
        {alerts.map((alert, index) => (
          <div key={index} className="col-12 col-lg-6">
            <div 
              className="d-flex align-items-center justify-content-between p-3"
              style={{
                backgroundColor: alert.bg,
                border: `1px solid ${alert.border}`,
                borderRadius: '10px',
                minHeight: '3.9375rem'
              }}
            >
              <p className="text-inter-22 mb-0" style={{fontSize:"1rem"}}>{alert.text}</p>
              <p className="text-inter-22-medium mb-0" style={{ color: alert.buttonColor, fontSize:"1rem" }}>
                {alert.buttonText}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="row mb-4 g-3">
        {statsCards.map((card, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg">
            <div 
              className="bg-white p-2 d-flex flex-column justify-content-around align-items-start"
              style={{
                // height: "6rem",
                borderLeft: `5px solid ${card.borderColor}`,
                borderRight: '0.8px solid #878787',
                borderTop: '0.8px solid #878787',
                borderBottom: '0.8px solid #878787',
                borderRadius: '10px',
                minHeight: '11.8125rem',
              }}
            >
              <div className="d-flex align-items-center justify-content-between g-5 mb-2">
                <p className="text-inter-22">{card.title}</p>
                <div className="icon-bg-small" style={{ backgroundColor: card.iconBg }}>
                  <img src={card.icon} alt={card.title} />
                </div>
              </div>
              <p className="text-number mb-1">{card.number}</p>
              <p className="text-gray-20 mb-0">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Order Lifecycle */}
      <div className="row g-3">
        {/* Quick Action Cards */}
        {quickActions.map((action, index) => (
          <div key={index} className="col-6 col-md-3 col-lg-2">
            <div 
              className="bg-white d-flex flex-column align-items-center justify-content-center p-3"
              style={{
                border: '0.8px solid #878787',
                borderRadius: '10px',
                minHeight: '11.4375rem'
              }}
            >
              <div 
                className="d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: '3.125rem',
                  height: '3.125rem',
                  backgroundColor: '#CDCDCD3B',
                  borderRadius: '50%'
                }}
              >
                <img 
                  src={action.icon} 
                  alt={action.title}
                  style={{ width: '1.625rem', height: '1.625rem' }}
                />
              </div>
              <p className="text-inter-22 mb-0 text-center">{action.title}</p>
            </div>
          </div>
        ))}

        {/* Order Lifecycle Overview */}
        <div className="col-12 col-md-6 col-lg-8">
          <div 
            className="bg-white p-3"
            style={{
              border: '0.8px solid #878787',
              borderRadius: '10px',
              minHeight: '11.4375rem'
            }}
          >
            <p className="text-inter-22-medium mb-3">Order Lifecycle Overview</p>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-1">
              {orderLifecycle.map((step, index) => (
                <div key={index} className="d-flex flex-column align-items-center ">
                  <div 
                    className="icon-bg-medium d-flex align-items-center justify-content-center mb-2"
                    style={{
                      backgroundColor: step.bg,
                      border: step.border
                    }}
                  >
                    {step.icon && (
                      <img 
                        src={step.icon} 
                        alt={step.title}
                        style={{ width: '1.5rem', height: '1.5rem' }}
                      />
                    )}
                  </div>
                  <p className="text-gray-20 mb-0 text-center">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CustomerOrdersCards />
      <DashboardOverview />
    </div>
  );
};

export default Dashboard;