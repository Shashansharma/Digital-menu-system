import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';
import '../styles/login.css';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (!formData.email.includes('@')) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Create user
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=4a90e2&color=fff`,
        phone: '',
        dietaryPreferences: [],
        joinDate: new Date().toISOString(),
        totalOrders: 0,
        favoriteItems: [],
        allergies: [],
        notifications: true,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'auth-token-' + Math.random().toString(36).substr(2, 9));

      navigate('/');
    } catch (err) {
      setError(err.message || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>

      <div className="login-content">
        {/* Left Side - Branding */}
        <div className="login-left">
          <div className="login-brand">
            <div className="brand-logo">
              <span className="logo-icon">🍽️</span>
            </div>
            <h1 className="brand-name">MenuDirect</h1>
            <p className="brand-tagline">Digital Menu & Smart Ordering</p>
          </div>

          <div className="login-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">📱</span>
              <div>
                <h3>Easy Ordering</h3>
                <p>Order directly from your table in seconds</p>
              </div>
            </div>

            <div className="benefit-item">
              <span className="benefit-icon">⚡</span>
              <div>
                <h3>Real-Time Updates</h3>
                <p>Track your order status instantly</p>
              </div>
            </div>

            <div className="benefit-item">
              <span className="benefit-icon">💰</span>
              <div>
                <h3>Smart Bill Split</h3>
                <p>Easily split bills with friends</p>
              </div>
            </div>

            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <div>
                <h3>Personalized</h3>
                <p>Save preferences and dietary needs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="login-right">
          <div className="login-form-wrapper">
            <h2 className="login-title">Create Account</h2>
            <p className="login-subtitle">Join MenuDirect for a smarter dining experience</p>

            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              {/* Name Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-field">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-field">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="form-field">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="checkbox-label" style={{ marginTop: '4px' }}>
                <input type="checkbox" defaultChecked required />
                <span>
                  I agree to the{' '}
                  <a href="#terms" style={{ color: '#667eea', textDecoration: 'none' }}>
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#privacy" style={{ color: '#667eea', textDecoration: 'none' }}>
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="button-login"
                disabled={loading}
                style={{ marginTop: '12px' }}
              >
                {loading ? (
                  <>
                    <span className="spinner-mini"></span>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider">
              <span>or sign up with</span>
            </div>

            {/* Social Sign Up */}
            <div className="social-login">
              <button type="button" className="social-btn google-btn" disabled={loading}>
                <span>🔵</span> Google
              </button>
              <button type="button" className="social-btn apple-btn" disabled={loading}>
                <span>🍎</span> Apple
              </button>
            </div>

            {/* Sign In Link */}
            <p className="signup-link">
              Already have an account?{' '}
              <Link to="/login" className="signup-anchor">
                Sign in
              </Link>
            </p>
          </div>

          {/* Footer Info */}
          <div className="login-footer">
            <p>🔒 Your data is encrypted and secure</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <span>•</span>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
