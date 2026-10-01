import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Checkout = () => {
  const { cart, getCartTotals, clearCart } = useCart();
  const { total } = getCartTotals();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    // Card details
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Valid 10-digit mobile is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Valid 6-digit pincode is required';

    if (paymentMethod === 'card') {
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
      if (!formData.cardNumber.trim() || formData.cardNumber.length < 16) newErrors.cardNumber = 'Valid card number is required';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry is required';
      if (!formData.cardCvv.trim() || formData.cardCvv.length < 3) newErrors.cardCvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsProcessing(true);
      // Simulate network request
      setTimeout(() => {
        setIsProcessing(false);
        showToast('Order placed successfully!', 'success');
        
        // Pass data to success page via state
        navigate('/order-success', { 
          state: { 
            orderId: `ORD-${Date.now().toString().slice(-6)}`,
            customer: formData.fullName,
            address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
            total: total,
            paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'qr' ? 'UPI / QR Payment' : 'Credit/Debit Card'
          } 
        });
        clearCart();
      }, 2000);
    } else {
      showToast('Please correct the highlighted fields.', 'error');
    }
  };

  if (cart.length === 0) return null;

  return (
    <div className="container py-5 fade-in">
      <h1 className="fw-bold mb-5">Checkout</h1>

      <div className="row g-5">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} id="checkout-form">
            {/* Delivery Info */}
            <div className="card surface-card border-0 p-4 mb-4">
              <h4 className="fw-bold mb-4">1. Delivery Information</h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small text-muted-custom">Full Name</label>
                  <input type="text" className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} name="fullName" value={formData.fullName} onChange={handleChange} />
                  {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted-custom">Mobile Number</label>
                  <input type="text" className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} name="mobile" maxLength="10" value={formData.mobile} onChange={handleChange} />
                  {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                </div>
                <div className="col-12">
                  <label className="form-label small text-muted-custom">Email Address</label>
                  <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="col-12">
                  <label className="form-label small text-muted-custom">Complete Address</label>
                  <textarea className={`form-control ${errors.address ? 'is-invalid' : ''}`} rows="2" name="address" value={formData.address} onChange={handleChange}></textarea>
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                <div className="col-md-4">
                  <label className="form-label small text-muted-custom">City</label>
                  <input type="text" className={`form-control ${errors.city ? 'is-invalid' : ''}`} name="city" value={formData.city} onChange={handleChange} />
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>
                <div className="col-md-4">
                  <label className="form-label small text-muted-custom">State</label>
                  <input type="text" className={`form-control ${errors.state ? 'is-invalid' : ''}`} name="state" value={formData.state} onChange={handleChange} />
                  {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                </div>
                <div className="col-md-4">
                  <label className="form-label small text-muted-custom">Pincode</label>
                  <input type="text" className={`form-control ${errors.pincode ? 'is-invalid' : ''}`} name="pincode" maxLength="6" value={formData.pincode} onChange={handleChange} />
                  {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card surface-card border-0 p-4">
              <h4 className="fw-bold mb-4">2. Payment Method</h4>
              
              {/* Payment Selectors */}
              <div className="d-flex flex-column gap-3 mb-4">
                <label className={`border rounded p-3 cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary bg-opacity-10' : ''}`} style={{ cursor: 'pointer' }}>
                  <div className="form-check d-flex align-items-center mb-0 gap-2">
                    <input className="form-check-input mt-0" type="radio" name="paymentMethod" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                    <div className="d-flex justify-content-between align-items-center w-100 ms-2">
                      <span className="fw-medium">Credit / Debit Card</span>
                      <div className="d-flex gap-2">
                        <i className="bi bi-credit-card-2-front fs-5 text-primary"></i>
                      </div>
                    </div>
                  </div>
                </label>

                <label className={`border rounded p-3 cursor-pointer ${paymentMethod === 'qr' ? 'border-primary bg-primary bg-opacity-10' : ''}`} style={{ cursor: 'pointer' }}>
                  <div className="form-check d-flex align-items-center mb-0 gap-2">
                    <input className="form-check-input mt-0" type="radio" name="paymentMethod" checked={paymentMethod === 'qr'} onChange={() => setPaymentMethod('qr')} />
                    <div className="d-flex justify-content-between align-items-center w-100 ms-2">
                      <span className="fw-medium">UPI / QR Code</span>
                      <i className="bi bi-qr-code-scan fs-5 text-primary"></i>
                    </div>
                  </div>
                </label>

                <label className={`border rounded p-3 cursor-pointer ${paymentMethod === 'cod' ? 'border-primary bg-primary bg-opacity-10' : ''}`} style={{ cursor: 'pointer' }}>
                  <div className="form-check d-flex align-items-center mb-0 gap-2">
                    <input className="form-check-input mt-0" type="radio" name="paymentMethod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                    <div className="d-flex justify-content-between align-items-center w-100 ms-2">
                      <span className="fw-medium">Cash on Delivery (COD)</span>
                      <i className="bi bi-cash-coin fs-5 text-success"></i>
                    </div>
                  </div>
                </label>
              </div>

              {/* Dynamic Payment Forms */}
              <div className="theme-bg-light rounded p-4 border mt-2 fade-in">
                {paymentMethod === 'card' && (
                  <div>
                    <div className="alert alert-info border-0 py-2 small d-flex align-items-center gap-2 mb-3">
                      <i className="bi bi-info-circle-fill"></i> This is a frontend demo. Do not enter real card details.
                    </div>
                    <div className="row g-3">
                      <div className="col-12">
                        <input type="text" className={`form-control ${errors.cardName ? 'is-invalid' : ''}`} placeholder="Name on Card" name="cardName" value={formData.cardName} onChange={handleChange} />
                      </div>
                      <div className="col-12">
                        <input type="text" className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`} placeholder="Card Number" maxLength="16" name="cardNumber" value={formData.cardNumber} onChange={handleChange} />
                      </div>
                      <div className="col-6">
                        <input type="text" className={`form-control ${errors.cardExpiry ? 'is-invalid' : ''}`} placeholder="MM/YY" name="cardExpiry" value={formData.cardExpiry} onChange={handleChange} />
                      </div>
                      <div className="col-6">
                        <input type="password" className={`form-control ${errors.cardCvv ? 'is-invalid' : ''}`} placeholder="CVV" maxLength="3" name="cardCvv" value={formData.cardCvv} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'qr' && (
                  <div className="text-center py-3">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VoltixDemoPayment" alt="QR Code" className="mb-3 rounded border p-2 bg-white" />
                    <p className="fw-medium mb-1">Scan with any UPI App</p>
                    <p className="text-muted-custom small mb-0">Total amount to pay: ₹{total.toLocaleString()}</p>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="text-center py-4">
                    <i className="bi bi-check-circle text-success display-4 mb-3 d-block"></i>
                    <p className="fw-medium mb-0">You can pay via Cash or UPI upon delivery.</p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="col-lg-4">
          <div className="card surface-card border-0 p-4 sticky-lg-top" style={{ top: '100px' }}>
            <h5 className="fw-bold mb-4">Your Order</h5>
            <div className="d-flex flex-column gap-3 mb-4">
              {cart.map(item => (
                <div key={item.id} className="d-flex align-items-center gap-3">
                  <div className="position-relative flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="theme-bg-light rounded p-1 object-fit-cover" width="60" height="60" />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary text-white" style={{ fontSize: '0.65rem' }}>
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <h6 className="mb-0 text-truncate text-body small fw-bold">{item.name}</h6>
                    <span className="text-primary fw-medium small">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <hr className="opacity-25" />
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted-custom fw-bold fs-5">Total</span>
              <span className="fw-bold fs-4 text-primary">₹{total.toLocaleString()}</span>
            </div>
            
            <button 
              type="submit" 
              form="checkout-form" 
              className="btn btn-primary w-100 btn-lg rounded-pill mt-4 shadow"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...</>
              ) : (
                <>Place Order <i className="bi bi-check-circle ms-2"></i></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
