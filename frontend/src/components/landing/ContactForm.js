import React, { useState } from 'react';
import ScrollReveal from '../ScrollReveal';
import api from '../../utils/axios';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    message: '',
  });
  const [status, setStatus] = useState(''); // idle, sending, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Fixed endpoint to singular 'contact' and matching backend fields
      await api.post('/public/contact', formData);
      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        city: '',
        message: '',
      });

      // Reset success status after 5 seconds to allow new submission
      setTimeout(() => setStatus(''), 5000);

    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="contact-section" id="contact">
      <ScrollReveal className="contact-container">

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Get in Touch</h2>

          <div className="form-group">
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="form-input"
              value={formData.fullName}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="fullName" className="form-label">Full Name</label>
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="email" className="form-label">Email Address</label>
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="mobile"
              id="mobile"
              className="form-input"
              value={formData.mobile}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="mobile" className="form-label">Mobile Number</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="city"
              id="city"
              className="form-input"
              value={formData.city}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="city" className="form-label">City</label>
          </div>

          <div className="form-group">
            <textarea
              name="message"
              id="message"
              className="form-textarea"
              value={formData.message}
              onChange={handleChange}
              placeholder=" "
              required
            ></textarea>
            <label htmlFor="message" className="form-label">Your Message</label>
          </div>

          <button type="submit" className="submit-btn" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <span>Sending...</span>
            ) : (
              <span>Send Message</span>
            )}
          </button>

          {status === 'success' && (
            <div className="form-status success">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div className="form-status error">
              Failed to send message. Please try again.
            </div>
          )}
        </form>

      </ScrollReveal>
    </section>
  );
}

export default ContactForm;

