import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    
    // Simulate login
    if (login(email, password)) {
      navigate('/');
    }
  };

  return (
    <div className="container py-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card surface-card border-0 shadow-sm p-4 p-md-5">
            <div className="text-center mb-4">
              <i className="bi bi-person-circle display-4 text-primary mb-3"></i>
              <h2 className="fw-bold">Welcome Back</h2>
              <p className="text-muted-custom">Sign in to your Voltix account</p>
            </div>
            
            {error && <div className="alert alert-danger border-0 small py-2">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small text-muted-custom">Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email}
                  onChange={(e) => {setEmail(e.target.value); setError('');}}
                />
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label small text-muted-custom mb-0">Password</label>
                  <a href="#" className="small text-decoration-none" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                </div>
                <input 
                  type="password" 
                  className="form-control mt-2" 
                  value={password}
                  onChange={(e) => {setPassword(e.target.value); setError('');}}
                />
              </div>
              
              <div className="mb-4 form-check">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label className="form-check-label small text-muted-custom" htmlFor="remember">Remember me</label>
              </div>
              
              <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm mb-4">
                Sign In
              </button>
              
              <div className="text-center text-muted-custom small">
                Don't have an account? <Link to="/signup" className="text-decoration-none fw-bold text-primary">Create Account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
