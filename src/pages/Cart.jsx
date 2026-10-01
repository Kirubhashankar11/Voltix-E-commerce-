import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotals } = useCart();
  const navigate = useNavigate();
  const { subtotal, originalTotal, discount, delivery, total } = getCartTotals();

  if (cart.length === 0) {
    return (
      <div className="container py-5 my-5 text-center fade-in">
        <i className="bi bi-cart-x display-1 text-muted-custom mb-4 opacity-50"></i>
        <h2 className="fw-bold mb-3">Your cart is waiting for something awesome.</h2>
        <p className="text-muted-custom mb-5">Explore our premium collection and find your next favorite tech companion.</p>
        <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-5">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-5 fade-in">
      <h1 className="fw-bold mb-5">Shopping Cart <span className="text-muted-custom fs-4 fw-normal">({cart.length} items)</span></h1>

      <div className="row g-5">
        <div className="col-lg-8">
          <div className="card surface-card border-0 p-4 mb-4">
            <div className="table-responsive">
              <table className="table table-borderless align-middle mb-0">
                <thead className="text-muted-custom border-bottom">
                  <tr>
                    <th scope="col" className="pb-3 text-uppercase small fw-semibold">Product</th>
                    <th scope="col" className="pb-3 text-uppercase small fw-semibold text-center">Quantity</th>
                    <th scope="col" className="pb-3 text-uppercase small fw-semibold text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={`${item.id}-${item.selectedColor}`} className="border-bottom">
                      <td className="py-4">
                        <div className="d-flex align-items-center gap-3">
                          <Link to={`/products/${item.id}`} className="flex-shrink-0 theme-bg-light rounded" style={{ width: '80px', height: '80px' }}>
                            <img src={item.images[0]} alt={item.name} className="w-100 h-100 object-fit-cover rounded p-1" />
                          </Link>
                          <div>
                            <Link to={`/products/${item.id}`} className="text-decoration-none">
                              <h6 className="fw-bold mb-1 text-body">{item.name}</h6>
                            </Link>
                            {item.selectedColor && <p className="text-muted-custom small mb-2">Color: {item.selectedColor}</p>}
                            <button className="btn btn-link text-danger text-decoration-none p-0 small fw-medium" onClick={() => removeFromCart(item.id)}>
                              <i className="bi bi-trash3 me-1"></i> Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <div className="d-inline-flex align-items-center border rounded-pill p-1" style={{ backgroundColor: 'var(--surface-color)' }}>
                          <button className="btn btn-sm btn-link text-decoration-none px-2" style={{ color: 'var(--text-color)' }} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <i className="bi bi-dash"></i>
                          </button>
                          <span className="fw-bold mx-2" style={{ minWidth: '20px', color: 'var(--text-color)' }}>{item.quantity}</span>
                          <button className="btn btn-sm btn-link text-decoration-none px-2" style={{ color: 'var(--text-color)' }} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="py-4 text-end">
                        <div className="fw-bold text-primary">₹{(item.price * item.quantity).toLocaleString()}</div>
                        {item.discount > 0 && (
                          <div className="text-muted-custom small text-decoration-line-through">₹{(item.originalPrice * item.quantity).toLocaleString()}</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Link to="/products" className="text-decoration-none fw-medium"><i className="bi bi-arrow-left me-2"></i> Continue Shopping</Link>
        </div>

        <div className="col-lg-4">
          <div className="card surface-card border-0 p-4 sticky-lg-top" style={{ top: '100px' }}>
            <h5 className="fw-bold mb-4">Order Summary</h5>
            
            <div className="d-flex justify-content-between mb-3 text-muted-custom">
              <span>Subtotal</span>
              <span>₹{originalTotal.toLocaleString()}</span>
            </div>
            
            {discount > 0 && (
              <div className="d-flex justify-content-between mb-3 text-success">
                <span>Discount</span>
                <span>-₹{discount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="d-flex justify-content-between mb-4 text-muted-custom">
              <span>Delivery Charges</span>
              <span>{delivery === 0 ? <span className="text-success">Free</span> : `₹${delivery}`}</span>
            </div>
            
            <hr className="opacity-25 my-4" />
            
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5">Total Amount</span>
              <span className="fw-bold fs-4 text-primary">₹{total.toLocaleString()}</span>
            </div>
            
            <button className="btn btn-primary w-100 btn-lg rounded-pill mb-3 shadow-sm" onClick={() => navigate('/checkout')}>
              Proceed to Checkout <i className="bi bi-arrow-right ms-2"></i>
            </button>

            <p className="text-center small text-muted-custom mb-0">
              <i className="bi bi-shield-lock me-1"></i> Secure checkout powered by Voltix
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
