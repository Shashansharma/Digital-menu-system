import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

export default function Header() {
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const features = [
    {
      icon: '🍽️',
      title: 'Digital Menu',
      description: 'Browse our complete menu with images and details',
      link: '/'
    },
    {
      icon: '📱',
      title: 'Easy Ordering',
      description: 'Order directly from your table in seconds',
      link: '/'
    },
    {
      icon: '⚡',
      title: 'Real-Time Tracking',
      description: 'Track your order status as it\'s prepared',
      link: '/'
    },
    {
      icon: '💰',
      title: 'Smart Bill Split',
      description: 'Easily split bills with your group',
      link: '/'
    },
    {
      icon: '🎯',
      title: 'Personalized',
      description: 'Save your preferences and dietary needs',
      link: '/'
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: 'Managers get insights into orders',
      link: '/manager'
    }
  ];

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand">🍽️ MenuDirect</Link>

        <nav className="header-nav">
          {/* Features Dropdown */}
          <div className="nav-item dropdown">
            <button
              className="nav-link features-trigger"
              onMouseEnter={() => setShowFeaturesMenu(true)}
              onMouseLeave={() => setShowFeaturesMenu(false)}
              onClick={() => setShowFeaturesMenu(!showFeaturesMenu)}
            >
              Features
              <span className="dropdown-arrow">▼</span>
            </button>

            {showFeaturesMenu && (
              <div
                className="features-menu"
                onMouseEnter={() => setShowFeaturesMenu(true)}
                onMouseLeave={() => setShowFeaturesMenu(false)}
              >
                <div className="features-grid">
                  {features.map((feature, index) => (
                    <Link
                      key={index}
                      to={feature.link}
                      className="feature-card"
                      onClick={() => setShowFeaturesMenu(false)}
                    >
                      <div className="feature-icon">{feature.icon}</div>
                      <div className="feature-content">
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Home Link */}
          <Link to="/" className="nav-link">
            Home
          </Link>

          {/* How It Works */}
          <a href="/#how-it-works" className="nav-link">
            How It Works
          </a>

          {/* Documentation */}
          <a href="/#docs" className="nav-link">
            Documentation
          </a>

          {/* Auth Links */}
          <div className="nav-actions">
            <Link to="/login" className="nav-link login-link">
              Sign In
            </Link>
            <Link to="/signup" className="nav-button signup-button">
              Get Started
            </Link>

            {/* User Menu */}
            <div className="nav-item dropdown user-menu">
              <button
                className="nav-link user-profile"
                onMouseEnter={() => setShowUserMenu(true)}
                onMouseLeave={() => setShowUserMenu(false)}
                onClick={() => setShowUserMenu(!showUserMenu)}
                title="User Profile"
              >
                👤
                <span className="dropdown-arrow">▼</span>
              </button>

              {showUserMenu && (
                <div
                  className="user-dropdown-menu"
                  onMouseEnter={() => setShowUserMenu(true)}
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <Link to="/profile" className="dropdown-item">
                    👤 Profile
                  </Link>
                  <Link to="/manager" className="dropdown-item">
                    📊 Manager Dashboard
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout-item">
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
