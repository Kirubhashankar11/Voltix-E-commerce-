import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state) return null;

  return (
    <div className="container py-5 my-5 text-center fade-in">
      <div className="mb-4">
        <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle shadow-lg mb-4" style={{ width: '100px', height: '100px' }}>
          <i className="bi bi-check-lg display-3"></i>
        </div>
      </div>
      <h1 className="fw-bold mb-3">Order Placed Successfully!</h1>
      <p className="text-muted-custom fs-5 mb-5 max-w-lg mx-auto" style={{ maxWidth: '600px' }}>
        Thank you for your purchase, {state.customer}. We've received your order and are getting it ready for delivery.
      </p>

      <div className="card surface-card border-0 text-start mx-auto shadow-sm mb-5" style={{ maxWidth: '600px' }}>
        <div className="card-header bg-primary bg-opacity-10 text-primary border-0 py-3 fw-bold">
          Order Summary
        </div>
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-sm-6">
              <span className="text-muted-custom small text-uppercase tracking-wider">Order ID</span>
              <p className="fw-bold mb-0">{state.orderId}</p>
            </div>
            <div className="col-sm-6">
              <span className="text-muted-custom small text-uppercase tracking-wider">Total Amount</span>
              <p className="fw-bold mb-0 text-primary">₹{state.total?.toLocaleString()}</p>
            </div>
            <div className="col-sm-6">
              <span className="text-muted-custom small text-uppercase tracking-wider">Payment Method</span>
              <p className="fw-bold mb-0">{state.paymentMethod}</p>
            </div>
            <div className="col-sm-6">
              <span className="text-muted-custom small text-uppercase tracking-wider">Est. Delivery</span>
              <p className="fw-bold mb-0">{new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
            </div>
            <div className="col-12 mt-3">
              <span className="text-muted-custom small text-uppercase tracking-wider">Delivery Address</span>
              <p className="fw-medium mb-0">{state.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Link to="/products" className="btn btn-primary rounded-pill px-4 py-2">Continue Shopping</Link>
        <Link to="/" className="btn btn-outline-primary rounded-pill px-4 py-2">Back to Home</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
