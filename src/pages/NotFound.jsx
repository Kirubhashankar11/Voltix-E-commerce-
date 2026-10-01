import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center text-center fade-in py-5">
      <i className="bi bi-exclamation-triangle display-1 text-warning mb-4"></i>
      <h1 className="display-1 fw-bold mb-3" style={{ color: 'var(--primary)' }}>404</h1>
      <h2 className="fw-bold mb-4">Page Not Found</h2>
      <p className="text-muted-custom fs-5 mb-5 max-w-lg mx-auto" style={{ maxWidth: '500px' }}>
        Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm">
        <i className="bi bi-house-door me-2"></i> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
