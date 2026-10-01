import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="fade-in">
      {/* 1. Hero */}
      <section className="bg-dark text-white py-5 position-relative text-center" style={{ minHeight: '400px', display: 'flex', alignItems: 'center' }}>
        <img src="https://images.unsplash.com/photo-1550009158-9ebf6d1736de?auto=format&fit=crop&q=80&w=1920" alt="About Hero" className="position-absolute w-100 h-100 object-fit-cover opacity-25 start-0 top-0" />
        <div className="container position-relative z-1">
          <h1 className="display-4 fw-bold mb-3">About VOLTIX</h1>
          <p className="lead mx-auto" style={{ maxWidth: '700px' }}>Redefining the way you interact with technology. Premium, innovative, and accessible.</p>
        </div>
      </section>

      {/* 2. Intro */}
      <section className="py-5 my-4">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Who We Are</h2>
          <p className="text-muted-custom fs-5 mx-auto" style={{ maxWidth: '800px' }}>
            Voltix was born from a simple idea: premium consumer electronics shouldn't just be for the elite. 
            We blend cutting-edge technology with stunning design to create products that enhance your daily life, 
            whether you're working out, commuting, or relaxing at home.
          </p>
        </div>
      </section>

      {/* 3 & 4. Mission and Vision */}
      <section className="py-5 theme-bg-light">
        <div className="container">
          <div className="row g-5">
            <div className="col-md-6">
              <div className="card surface-card border-0 p-5 h-100 text-center">
                <i className="bi bi-rocket-takeoff display-4 text-primary mb-4"></i>
                <h3 className="fw-bold mb-3">Our Mission</h3>
                <p className="text-muted-custom mb-0">To democratize premium technology by delivering exceptional audio and wearable devices that empower people to do more and be more.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card surface-card border-0 p-5 h-100 text-center">
                <i className="bi bi-eye display-4 text-primary mb-4"></i>
                <h3 className="fw-bold mb-3">Our Vision</h3>
                <p className="text-muted-custom mb-0">To become the world's most loved consumer electronics brand, recognized for uncompromising quality and bold innovation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="py-5 my-4">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">Our Core Values</h2>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <i className="bi bi-gem display-4 text-primary mb-3"></i>
              <h5 className="fw-bold">Premium Quality</h5>
              <p className="text-muted-custom small">We never cut corners. Every product is built to last.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-lightbulb display-4 text-primary mb-3"></i>
              <h5 className="fw-bold">Innovation</h5>
              <p className="text-muted-custom small">Constantly pushing the boundaries of what's possible.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-people display-4 text-primary mb-3"></i>
              <h5 className="fw-bold">Customer First</h5>
              <p className="text-muted-custom small">Your satisfaction is the heartbeat of our company.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Statistics */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <h2 className="display-4 fw-bold mb-2">1M+</h2>
              <p className="mb-0 text-white-50 text-uppercase tracking-wider small">Happy Customers</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-4 fw-bold mb-2">50+</h2>
              <p className="mb-0 text-white-50 text-uppercase tracking-wider small">Products</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-4 fw-bold mb-2">15</h2>
              <p className="mb-0 text-white-50 text-uppercase tracking-wider small">Awards Won</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-4 fw-bold mb-2">24/7</h2>
              <p className="mb-0 text-white-50 text-uppercase tracking-wider small">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Join Us / CTA */}
      <section className="py-5 my-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">Experience the Voltix Difference</h2>
          <p className="text-muted-custom mb-4 mx-auto" style={{ maxWidth: '600px' }}>Join millions of others who have already upgraded their everyday tech. Check out our latest collection.</p>
          <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-5">Shop Now</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
