import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-5 pb-4 mt-5 border-top border-opacity-25" style={{ backgroundColor: 'var(--surface-color)' }}>
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <Link className="d-flex align-items-center gap-2 text-decoration-none mb-3" to="/">
              <i className="bi bi-lightning-charge-fill text-primary fs-3"></i>
              <span className="fs-4 fw-bold" style={{ color: 'var(--text-color)', letterSpacing: '-1px' }}>VOLTIX</span>
            </Link>
            <p className="text-muted-custom pe-lg-4 mb-4">
              Premium consumer electronics designed to elevate your everyday experience. 
              Technology that moves with you, built for the modern lifestyle.
            </p>
            <div className="d-flex gap-3">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="btn-icon">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="btn-icon">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="btn-icon">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="btn-icon">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-icon">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="fw-bold mb-4">Quick Links</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/" className="text-muted-custom text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-muted-custom text-decoration-none">Products</Link></li>
              <li><Link to="/about" className="text-muted-custom text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-custom text-decoration-none">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 col-6">
            <h5 className="fw-bold mb-4">Customer Support</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/contact" className="text-muted-custom text-decoration-none">Help Center</Link></li>
              <li><Link to="/contact" className="text-muted-custom text-decoration-none">Shipping & Delivery</Link></li>
              <li><Link to="/contact" className="text-muted-custom text-decoration-none">Returns Policy</Link></li>
              <li><Link to="/contact" className="text-muted-custom text-decoration-none">Warranty</Link></li>
              <li><Link to="/contact" className="text-muted-custom text-decoration-none">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-4">Newsletter</h5>
            <p className="text-muted-custom mb-3">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input type="email" className="form-control me-2 rounded-3" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-primary rounded-3">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="border-top border-opacity-10 mt-5 pt-4 text-center text-muted-custom">
          <p className="mb-0">&copy; {new Date().getFullYear()} VOLTIX Electronics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
