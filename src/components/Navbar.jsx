import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      // Close mobile menu if open
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse.classList.contains('show')) {
        document.querySelector('.navbar-toggler').click();
      }
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isDarkMode ? 'navbar-dark bg-dark border-bottom border-secondary' : 'navbar-light bg-white border-bottom'}`} style={{ transition: 'all 0.3s' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <i className="bi bi-lightning-charge-fill text-primary fs-3"></i>
          <span className="fs-4 tracking-tight" style={{ letterSpacing: '-1px' }}>VOLTIX</span>
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-medium">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
          </ul>
          
          <form className="d-flex me-3 position-relative d-none d-lg-flex" onSubmit={handleSearch}>
            <input name="search" className="form-control rounded-pill pe-5" type="search" placeholder="Search products..." aria-label="Search" style={{ width: '250px' }} />
            <button className="btn border-0 position-absolute end-0 top-50 translate-middle-y text-muted-custom" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          {/* Mobile search */}
          <form className="d-flex mb-3 d-lg-none" onSubmit={handleSearch}>
            <input name="search" className="form-control me-2" type="search" placeholder="Search..." aria-label="Search" />
            <button className="btn btn-outline-primary" type="submit">Search</button>
          </form>
          
          <div className="d-flex align-items-center gap-3">
            <button onClick={toggleTheme} className="btn btn-link text-decoration-none p-0 d-flex align-items-center text-muted-custom" title="Toggle Theme">
              {isDarkMode ? <i className="bi bi-sun-fill fs-5"></i> : <i className="bi bi-moon-fill fs-5"></i>}
            </button>

            <Link to="/wishlist" className="position-relative text-muted-custom text-decoration-none">
              <i className="bi bi-heart fs-5"></i>
              {getWishlistCount() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                  {getWishlistCount()}
                </span>
              )}
            </Link>

            <Link to="/cart" className="position-relative text-muted-custom text-decoration-none me-2">
              <i className="bi bi-bag fs-5"></i>
              {getCartCount() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: '0.65rem' }}>
                  {getCartCount()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="dropdown">
                <button className="btn btn-link text-decoration-none p-0 d-flex align-items-center gap-2 text-muted-custom dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle fs-5"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userDropdown">
                  <li><span className="dropdown-item-text fw-bold">{user.name}</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-primary btn-sm rounded-pill px-3">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
