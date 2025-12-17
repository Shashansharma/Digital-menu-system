import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';
import '../styles/header.css';

export default function Header() {
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const featuresRef = useRef(null);
  const userMenuRef = useRef(null);
  const location = useLocation();

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setShowFeaturesMenu(false);
    setShowUserMenu(false);
    setMobileMenuOpen(false);
  }, [location]);

  // Close menus on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowFeaturesMenu(false);
        setShowUserMenu(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setShowUserMenu(false);
    navigate('/');
  };

  // Handle click outside to close menus
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (featuresRef.current && !featuresRef.current.contains(e.target)) {
        setShowFeaturesMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="site-header-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand">
          🍽️ MenuDirect
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          {/* Features Dropdown */}
          <div 
            ref={featuresRef}
            className="nav-item dropdown features-dropdown"
            onMouseEnter={() => setShowFeaturesMenu(true)}
            onMouseLeave={() => setShowFeaturesMenu(false)}
          >
            <button
              className={`nav-link features-trigger ${showFeaturesMenu ? 'active' : ''}`}
              onClick={() => setShowFeaturesMenu(!showFeaturesMenu)}
              aria-expanded={showFeaturesMenu}
              aria-label="Toggle features menu"
            >
              Features
              <span className={`dropdown-arrow ${showFeaturesMenu ? 'open' : ''}`}>▼</span>
            </button>

            {showFeaturesMenu && (
              <div className="features-menu" role="menu">
                <div className="features-grid">
                  {features.map((feature, index) => (
                    <Link
                      key={index}
                      to={feature.link}
                      className="feature-card"
                      onClick={() => setShowFeaturesMenu(false)}
                      role="menuitem"
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
        </nav>

        {/* Auth and User Section */}
        <div className="nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="nav-link login-link">
                Sign In
              </Link>
              <Link to="/signup" className="nav-button signup-button">
                Get Started
              </Link>
            </>
          ) : (
            <div className="user-welcome">
              <span className="welcome-text">Welcome, {user.name}!</span>
            </div>
          )}

          {/* User Menu */}
          <div 
            ref={userMenuRef}
            className="nav-item dropdown user-menu"
            onMouseEnter={() => setShowUserMenu(true)}
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <button
              className={`nav-link user-profile ${showUserMenu ? 'active' : ''}`}
              onClick={() => setShowUserMenu(!showUserMenu)}
              title="User Profile"
              aria-expanded={showUserMenu}
              aria-label="Toggle user menu"
            >
              <span className="profile-avatar">{user ? user.name.charAt(0).toUpperCase() : '👤'}</span>
              <span className={`dropdown-arrow ${showUserMenu ? 'open' : ''}`}>▼</span>
            </button>

            {showUserMenu && (
              <div className="user-dropdown-menu" role="menu">
                <div className="menu-header">
                  <span className="menu-user-name">{user?.name || 'Guest'}</span>
                  <span className="menu-user-email">{user?.email || 'Not logged in'}</span>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)} role="menuitem">
                  👤 Profile
                </Link>
                <Link to="/manager" className="dropdown-item" onClick={() => setShowUserMenu(false)} role="menuitem">
                  📊 Manager Dashboard
                </Link>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item logout-item"
                  onClick={handleLogout}
                  role="menuitem"
                >
                  🚪 {user ? 'Logout' : 'Login'}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-section">
            <Link to="/" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              🏠 Home
            </Link>
            <button className="mobile-nav-item features-mobile-toggle" onClick={() => setShowFeaturesMenu(!showFeaturesMenu)}>
              ✨ Features {showFeaturesMenu ? '▲' : '▼'}
            </button>
            {showFeaturesMenu && (
              <div className="mobile-features-list">
                {features.map((feature, index) => (
                  <Link
                    key={index}
                    to={feature.link}
                    className="mobile-feature-item"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowFeaturesMenu(false);
                    }}
                  >
                    <span className="feature-icon-small">{feature.icon}</span>
                    <span>{feature.title}</span>
                  </Link>
                ))}
              </div>
            )}
            <a href="/#how-it-works" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              ❓ How It Works
            </a>
            <a href="/#docs" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              � Documentation
            </a>
          </div>

          {!user && (
            <div className="mobile-nav-section">
              <Link to="/login" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                🔐 Sign In
              </Link>
              <Link to="/signup" className="mobile-nav-item mobile-signup" onClick={() => setMobileMenuOpen(false)}>
                🚀 Get Started
              </Link>
            </div>
          )}

          {user && (
            <div className="mobile-nav-section">
              <div className="mobile-user-info">
                <span className="mobile-user-name">{user.name}</span>
                <span className="mobile-user-email">{user.email}</span>
              </div>
              <Link to="/profile" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                👤 Profile
              </Link>
              <Link to="/manager" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                📊 Manager Dashboard
              </Link>
              <button 
                className="mobile-nav-item mobile-logout"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
