import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      showToast('Your message has been sent successfully.', 'success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  return (
    <div className="fade-in">
      {/* 1. Hero */}
      <section className="bg-dark text-white py-5 position-relative text-center" style={{ minHeight: '300px', display: 'flex', alignItems: 'center' }}>
        <div className="container position-relative z-1">
          <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
          <p className="lead text-white-50 mx-auto" style={{ maxWidth: '600px' }}>We're here to help. Reach out to us for any queries, support, or feedback.</p>
        </div>
      </section>

      <section className="py-5 my-4">
        <div className="container">
          <div className="row g-5">
            {/* Contact Info (2, 3, 4, 5) */}
            <div className="col-lg-5">
              <h3 className="fw-bold mb-4">Get in Touch</h3>
              <p className="text-muted-custom mb-5">Have a question about a product, order, or just want to say hi? Our team is ready to assist you.</p>
              
              <div className="d-flex align-items-start mb-4">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                  <i className="bi bi-geo-alt fs-4"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Head Office</h5>
                  <p className="text-muted-custom mb-0">123 Tech Park, Silicon Valley, Bengaluru, 560001</p>
                </div>
              </div>
              
              <div className="d-flex align-items-start mb-4">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                  <i className="bi bi-telephone fs-4"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Phone Number</h5>
                  <p className="text-muted-custom mb-0">1800-123-4567 (Mon-Sat, 9AM-6PM)</p>
                </div>
              </div>
              
              <div className="d-flex align-items-start mb-4">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                  <i className="bi bi-envelope fs-4"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Email Address</h5>
                  <p className="text-muted-custom mb-0">support@voltix.com</p>
                </div>
              </div>
            </div>

            {/* 6. Contact Form */}
            <div className="col-lg-7">
              <div className="card surface-card border-0 p-4 p-md-5 shadow-sm">
                <h4 className="fw-bold mb-4">Send us a Message</h4>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small text-muted-custom">Your Name <span className="text-danger">*</span></label>
                      <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" value={formData.name} onChange={handleChange} />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted-custom">Email Address <span className="text-danger">*</span></label>
                      <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted-custom">Phone (Optional)</label>
                      <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted-custom">Subject (Optional)</label>
                      <input type="text" className="form-control" name="subject" value={formData.subject} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label small text-muted-custom">Message <span className="text-danger">*</span></label>
                      <textarea className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="5" name="message" value={formData.message} onChange={handleChange}></textarea>
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>
                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-primary rounded-pill px-5 py-2 fw-bold w-100 w-md-auto">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-5 theme-bg-light mt-5">
        <div className="container py-4">
          <h2 className="fw-bold text-center mb-5">Frequently Asked Questions</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion border-0" id="faqAccordion">
                {[
                  { q: 'How long does delivery take?', a: 'Standard delivery takes 3-5 business days. Metro cities may receive orders within 2 days.' },
                  { q: 'What is your return policy?', a: 'We offer a 7-day hassle-free return policy for all unused products in their original packaging.' },
                  { q: 'Do your products come with a warranty?', a: 'Yes, all Voltix products come with a standard 1-year manufacturer warranty covering internal defects.' }
                ].map((item, idx) => (
                  <div className="accordion-item border-0 mb-3 rounded overflow-hidden" key={idx}>
                    <h2 className="accordion-header" id={`heading${idx}`}>
                      <button className={`accordion-button ${idx !== 0 ? 'collapsed' : ''} bg-white fw-bold shadow-none`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`} aria-expanded={idx === 0} aria-controls={`collapse${idx}`}>
                        {item.q}
                      </button>
                    </h2>
                    <div id={`collapse${idx}`} className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`} aria-labelledby={`heading${idx}`} data-bs-parent="#faqAccordion">
                      <div className="accordion-body bg-white text-muted-custom border-top">
                        {item.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
