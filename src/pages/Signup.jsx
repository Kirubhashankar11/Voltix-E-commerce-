import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', terms: false });
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full Name is required';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid 10-digit phone is required';
    if (!formData.password || formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.terms) newErrors.terms = 'You must accept the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (signup(formData)) {
        navigate('/');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  return (
    <div className="container py-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card surface-card border-0 shadow-sm p-4 p-md-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Create Account</h2>
              <p className="text-muted-custom">Join the Voltix community today</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-4">
                <div className="col-12">
                  <label className="form-label small text-muted-custom">Full Name</label>
                  <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" value={formData.name} onChange={handleChange} />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                
                <div className="col-md-6">
                  <label className="form-label small text-muted-custom">Email Address</label>
                  <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                
                <div className="col-md-6">
                  <label className="form-label small text-muted-custom">Phone Number</label>
                  <input type="text" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} name="phone" maxLength="10" value={formData.phone} onChange={handleChange} />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                
                <div className="col-md-6">
                  <label className="form-label small text-muted-custom">Password</label>
                  <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} name="password" value={formData.password} onChange={handleChange} />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                
                <div className="col-md-6">
                  <label className="form-label small text-muted-custom">Confirm Password</label>
                  <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
              </div>
              
              <div className="mb-4 form-check">
                <input type="checkbox" className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`} id="terms" name="terms" checked={formData.terms} onChange={handleChange} />
                <label className="form-check-label small text-muted-custom" htmlFor="terms">
                  I agree to the <Link to="/terms">Terms & Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>
                </label>
                {errors.terms && <div className="invalid-feedback d-block">{errors.terms}</div>}
              </div>
              
              <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm mb-4">
                Create Account
              </button>
              
              <div className="text-center text-muted-custom small">
                Already have an account? <Link to="/login" className="text-decoration-none fw-bold text-primary">Sign In</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
