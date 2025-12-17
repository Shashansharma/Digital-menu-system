import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/home.css';

export default function HomePage() {
  const [tableNumber, setTableNumber] = useState('');
  const navigate = useNavigate();

  const handleTableSubmit = (e) => {
    e.preventDefault();
    if (tableNumber.trim()) {
      navigate(`/table/${tableNumber}`);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">MenuDirect</h1>
          <p className="hero-subtitle">Digital Menu & Ordering at Your Fingertips</p>
          <p className="hero-description">
            Seamless dining experience. Order directly from your table. 
            Real-time kitchen updates. Split bills with ease.
          </p>
        </div>
        <div className="hero-illustration">
          <div className="illustration-icon">📱</div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="quick-start">
        <div className="container-large">
          <h2>Get Started in Seconds</h2>
          <form onSubmit={handleTableSubmit} className="table-form">
            <div className="form-group">
              <label htmlFor="tableNumber" className="form-label">Enter Your Table Number</label>
              <div className="input-group">
                <input
                  id="tableNumber"
                  type="text"
                  placeholder="e.g., 12"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="table-input"
                />
                <button type="submit" className="button primary large">
                  Start Ordering
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container-large">
          <h2 className="section-title">Why Choose MenuDirect?</h2>
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>Browse Menu Easily</h3>
              <p>
                Explore our complete menu with high-quality images, detailed descriptions, and real-time availability.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Order in Seconds</h3>
              <p>
                Add items to your cart and place orders directly from your phone. No waiting for staff.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon">👁️</div>
              <h3>Track Orders Live</h3>
              <p>
                Real-time kitchen updates show exactly when your order is being prepared and ready to serve.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Split Bills Effortlessly</h3>
              <p>
                Easily split payments with friends. Choose items, select payment methods, and settle instantly.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Instant Notifications</h3>
              <p>
                Get notified when your order is ready. Never miss an update about your meal.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Smart Analytics</h3>
              <p>
                Managers get insights into order trends, popular dishes, and customer preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container-large">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Scan QR Code</h3>
              <p>Scan the QR code on your table to access the menu</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Browse Menu</h3>
              <p>Explore dishes and check real-time availability</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Place Order</h3>
              <p>Add items and place your order instantly</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Track & Enjoy</h3>
              <p>Track your order and enjoy your meal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight Section */}
      <section className="highlights">
        <div className="container-large">
          <div className="highlight-item">
            <div className="highlight-content">
              <h3>Hassle-Free Ordering</h3>
              <p>
                No need to flag down servers. Order at your own pace with just a few taps. 
                Your order goes directly to the kitchen.
              </p>
              <ul className="highlight-list">
                <li>✓ Customize each item to your preference</li>
                <li>✓ Special requests and dietary notes</li>
                <li>✓ See item preparation time</li>
              </ul>
            </div>
            <div className="highlight-icon">📝</div>
          </div>

          <div className="highlight-item reverse">
            <div className="highlight-content">
              <h3>Real-Time Kitchen Status</h3>
              <p>
                Stay informed every step of the way. Watch your order move through preparation, 
                cooking, and ready-to-serve stages.
              </p>
              <ul className="highlight-list">
                <li>✓ Live preparation status</li>
                <li>✓ Estimated time remaining</li>
                <li>✓ Get notified when ready</li>
              </ul>
            </div>
            <div className="highlight-icon">🚀</div>
          </div>

          <div className="highlight-item">
            <div className="highlight-content">
              <h3>Smart Bill Splitting</h3>
              <p>
                No more complicated calculations. Easily split bills with your group. 
                Each person pays only for what they ordered.
              </p>
              <ul className="highlight-list">
                <li>✓ Automatic bill splitting</li>
                <li>✓ Multiple payment methods</li>
                <li>✓ Transparent itemized bills</li>
              </ul>
            </div>
            <div className="highlight-icon">💳</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container-large">
          <h2>Ready to Experience Premium Dining?</h2>
          <p>Enter your table number above and start ordering now!</p>
          <div className="cta-buttons">
            {tableNumber && (
              <button
                onClick={handleTableSubmit}
                className="button primary large"
              >
                Go to Table {tableNumber}
              </button>
            )}
            {!tableNumber && (
              <button
                onClick={() => navigate('/table/1')}
                className="button primary large"
              >
                Try Demo (Table 1)
              </button>
            )}
            <Link to="/login" className="button outline large">
              Sign In
            </Link>
            <Link to="/signup" className="button outline large">
              Sign Up
            </Link>
            <Link to="/manager" className="button outline large">
              Manager Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container-large">
          <div className="footer-content">
            <div className="footer-section">
              <h4>MenuDirect</h4>
              <p>Revolutionizing restaurant dining with digital menus and smart ordering.</p>
            </div>
            <div className="footer-section">
              <h4>Features</h4>
              <ul>
                <li><a href="#features">Digital Menu</a></li>
                <li><a href="#features">Order Tracking</a></li>
                <li><a href="#features">Bill Splitting</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>For Business</h4>
              <ul>
                <li><Link to="/manager">Manager Dashboard</Link></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 MenuDirect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
