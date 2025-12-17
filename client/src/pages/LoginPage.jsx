import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';
import '../styles/login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Basic validation
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }

      // Simulate login (replace with actual API call)
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        name: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${email}&background=4a90e2&color=fff`,
        phone: '+1 (555) 123-4567',
        dietaryPreferences: [],
        joinDate: new Date().toISOString(),
        totalOrders: 0,
        favoriteItems: [],
        allergies: [],
        notifications: true,
      };

      // Store user data
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'auth-token-' + Math.random().toString(36).substr(2, 9));

      // Redirect to home
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoUser = {
      id: 'demo-user-001',
      email: 'demo@menudirect.com',
      name: 'Demo User',
      avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=4a90e2&color=fff',
      phone: '+1 (555) 000-0000',
      dietaryPreferences: ['Vegetarian'],
      joinDate: new Date().toISOString(),
      totalOrders: 12,
      favoriteItems: [],
      allergies: [],
      notifications: true,
    };

    setUser(demoUser);
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('token', 'demo-token-12345');
    navigate('/');
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

        {/* Right Side - Login Form */}
        <div className="login-right">
          <div className="login-form-wrapper">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to your MenuDirect account</p>

            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
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
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Remember & Forgot */}
              <div className="form-row">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="button-login"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-mini"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider">
              <span>or continue with</span>
            </div>

            {/* Social Login */}
            <div className="social-login">
              <button type="button" className="social-btn google-btn" disabled={loading}>
                <span>🔵</span> Google
              </button>
              <button type="button" className="social-btn apple-btn" disabled={loading}>
                <span>🍎</span> Apple
              </button>
            </div>

            {/* Demo Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="button-demo"
              disabled={loading}
            >
              Try Demo Account
            </button>

            {/* Sign Up Link */}
            <p className="signup-link">
              Don't have an account?{' '}
              <Link to="/signup" className="signup-anchor">
                Create one
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
