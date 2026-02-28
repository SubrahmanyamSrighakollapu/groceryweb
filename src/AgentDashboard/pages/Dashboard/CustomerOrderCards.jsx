const CustomerOrdersCards = () => {
  // Card data in array format
  const cardsData = [
    {
      id: 1,
      title: "New customer orders",
      headers: ["Order ID", "Customer", "Product", "QTY", "Action"],
      dataKeys: ["orderId", "customer", "product", "qty", "action"],
      orders: [
        { orderId: { line1: "Order", line2: "#2415" }, customer: "Ramesh", product: "Wheat", qty: "2.5 Tons", action: "Purchase" },
        { orderId: { line1: "Order", line2: "#2418" }, customer: "Raju", product: "Toor Dal", qty: "500 Kg", action: "Purchase" },
        { orderId: { line1: "Order", line2: "#2480" }, customer: "Ramesh", product: "Basmati Rice", qty: "1 Ton", action: "Purchase" }
      ]
    },
    {
      id: 2,
      title: "Pending Farmer Purchase",
      headers: ["Farmer", "Product", "Price", "Status", "Action"],
      dataKeys: ["farmer", "product", "price", "status", "action"],
      orders: [
        { farmer: "Ramesh", product: "Wheat", price: "₹ 52,000", status: "Awaiting", action: "Confirm" },
        { farmer: "Raju", product: "Toor Dal", price: "₹ 48,000", status: "Confirm", action: "Scheduled Pickup" },
        { farmer: "Ramesh", product: "Basmati Rice", price: "₹ 85,000", status: "Scheduled", action: "Processing" }
      ]
    }
  ];

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="row g-4 justify-content-center" style={{ alignItems: 'stretch' }}>
        {cardsData.map((card) => (
          <div key={card.id} className="col-12 col-xl-6 mb-4 card-wrapper" style={{ display: 'flex' }}>
            <div 
              className="card shadow-sm" 
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #e0e0e0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              {/* Card Title */}
              <div className="card-body px-4 pt-4 pb-3">
                <p className="text-inter-26 mb-0 text-start">{card.title}</p>
              </div>

              {/* Divider Line */}
              {/* <hr className="m-0" style={{ borderColor: '#e0e0e0' }} /> */}

              {/* Table */}
              <div className="table-responsive">
                <table className="table mb-0" style={{ borderCollapse: 'collapse', width: '100%', borderTop: '0.5px solid #00000080', borderBottom: '0.5px solid #00000080' }}>
                  {/* Table Header */}
                  <thead>
                    <tr style={{ backgroundColor: '#FAFCF8', display: 'flex' }}>
                      {card.headers.map((header, idx) => (
                        <th key={idx} className="text-dark-green-22 table-header-cell " style={{color:'#EC5B13'}}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  
                  {/* Table Body */}
                  <tbody>
                    {card.orders.map((order, index) => (
                      <tr key={index} style={{ display: 'flex', alignItems: 'center', minHeight: '60px' }}>
                        {card.dataKeys.map((key, idx) => (
                          <td 
                            key={idx} 
                            className={key === 'action' ? 'table-cell' : 'table-cell text-gray-20'}
                          >
                            {key === 'action' ? (
                              <span className="text-light-green-20" style={{ cursor: 'pointer', color:'#EC5B13' }}>
                                {order[key]}
                              </span>
                            ) : key === 'orderId' && typeof order[key] === 'object' ? (
                              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.4' }}>
                                <span>{order[key].line1}</span>
                                <span>{order[key].line2}</span>
                              </div>
                            ) : (
                              order[key]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .table-header-cell {
          border: none;
          flex: 0 0 20%;
          text-align: center;
          padding: 0.75rem 0.7rem;
        }

        .table-cell {
          border: none;
          flex: 0 0 20%;
          text-align: center;
          word-wrap: break-word;
          white-space: normal;
          padding: 0.75rem 0.7rem;
        }

        @media (max-width: 1200px) {
          .col-xl-6 {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .card-wrapper {
            width: 90% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }

        @media (max-width: 576px) {
          .card-wrapper {
            width: 90% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerOrdersCards;