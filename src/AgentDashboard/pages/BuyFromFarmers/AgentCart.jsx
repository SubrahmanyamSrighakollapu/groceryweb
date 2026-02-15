import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import Check from "../../../assets/cart/Check_img.png";
import Delete from "../../../assets/cart/Delete_img.png";
import Delivery from "../../../assets/cart/Delivery_img.png";
import Security from "../../../assets/cart/Security_img.png";
import productService from "../../../services/productService";

const AgentCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteCartId, setDeleteCartId] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await productService.getCartItems();
      if (response && response.status === 1 && response.result) {
        setCartItems(response.result);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch cart';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getImagePath = (imgPath) => {
    if (!imgPath) return '';
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) return imgPath;
    return `${import.meta.env.VITE_API_BASE_URL}/${imgPath.replace(/\\/g, '/')}`;
  };

  const handleDeleteClick = (cartId) => {
    setDeleteCartId(cartId);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await productService.removeFromCart(deleteCartId);
      if (response && response.status === 1) {
        toast.success('Item removed from cart');
        setDeleteCartId(null);
        fetchCartItems();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to remove item';
      toast.error(errorMessage);
    }
  };

  const handleCancelDelete = () => {
    setDeleteCartId(null);
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.unitsTotalPrice), 0);
    const gstTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.gSTAmount), 0);
    const transportCharges = 1000;
    const total = subtotal + gstTotal + transportCharges;

    return { subtotal, gstTotal, transportCharges, total };
  };

  const { subtotal, gstTotal, transportCharges, total } = calculateTotals();

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-lg-8">
          <h4 className="mb-4">Your Cart</h4>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="card p-5 text-center">
              <p className="text-muted">Your cart is empty</p>
              <button 
                className="btn btn-success mt-3"
                onClick={() => navigate('/agent/buy-from-farmers')}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="card p-3">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>GST</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.cartId}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={getImagePath(item.productImages)}
                              alt={item.productName}
                              width="40"
                              height="40"
                              className="rounded-circle"
                              style={{ objectFit: 'cover' }}
                            />
                            <span>{item.productName}</span>
                          </div>
                        </td>
                        <td>{item.categoryName}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span>{item.noOfQuantity}</span>
                          </div>
                        </td>
                        <td>₹{parseFloat(item.unitPrice).toFixed(2)}</td>
                        <td>₹{parseFloat(item.gSTAmount).toFixed(2)}</td>
                        <td>₹{parseFloat(item.lineItemTotal).toFixed(2)}</td>
                        <td>
                          <button 
                            className="btn btn-light btn-sm"
                            onClick={() => handleDeleteClick(item.cartId)}
                          >
                            <img src={Delete} alt="Delete" width="18" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className="d-flex align-items-center mt-4"
                style={{
                  width: "480px",
                  maxWidth: "100%",
                  height: "80px",
                  gap: "16px",
                  padding: "12px 16px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Have a coupon code?"
                  style={{ height: "40px" }}
                />

                <button
                  className="btn btn-success"
                  style={{
                    height: "40px",
                    padding: "0 24px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Apply
                </button>
              </div>
            </>
          )}
        </div>
        
        <div className="col-lg-4">
          <div className="card p-4">
            <h5 className="mb-4">Order Summary</h5>

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Transport charges (Est.)</span>
              <span>₹ {transportCharges.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>GST</span>
              <span>₹ {gstTotal.toFixed(2)}</span>
            </div>

            <hr />
            
            <div className="d-flex justify-content-between mb-3 fw-bold">
              <span>Total</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>

            <small className="text-muted d-block mb-3">
              Includes all taxes
            </small>

            <button
              className="btn btn-success w-100 mb-3"
              onClick={() => navigate("/agent/checkout")}
              disabled={cartItems.length === 0}
            >
              → Proceed to Checkout
            </button>

            <button className="btn btn-light w-100 mb-4">
              Request Quotation
            </button>

            <ul className="list-unstyled">
              <li className="d-flex align-items-center gap-2 mb-3">
                <img src={Security} alt="Secure Payment" width="20" />
                <span>Secure Payment</span>
              </li>
              <li className="d-flex align-items-center gap-2 mb-3">
                <img src={Delivery} alt="Fast Delivery" width="20" />
                <span>Fast Delivery</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <img src={Check} alt="Quality Check" width="20" />
                <span>Quality Check</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteCartId && (
        <div 
          className="modal show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={handleCancelDelete}
        >
          <div 
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove this item from your cart?</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCancelDelete}
                >
                  No
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleConfirmDelete}
                >
                  Yes, Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentCart;
