import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/axios';
import AuroraBackground from '../../components/AuroraBackground';
import './AdminLogin.css';

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: 'admin',
    password: 'password123',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <AuroraBackground />
      <div className="admin-login-overlay">
        <div className="login-container">
          <h1 className="login-title">
            Welcome Back
            <span className="login-subtitle">Sign in to admin panel</span>
          </h1>
          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? <span className="loader"></span> : 'Login'}
            </button>
          </form>
          <div className="login-footer">
            <Link to="/" className="back-to-site">
              &larr; Back to Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;



