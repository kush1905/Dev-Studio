import React, { useState } from 'react';
import api from '../../utils/axios';
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.post('/public/newsletter', { email });
      setMessage('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      setMessage(
        error.response?.data?.error || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
          <p className="newsletter-subtitle">
            Stay updated with our latest news and updates
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button
              type="submit"
              className="newsletter-button"
              disabled={loading}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {message && (
            <div
              className={`newsletter-message ${
                message.includes('Successfully') ? 'success' : 'error'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Newsletter;


