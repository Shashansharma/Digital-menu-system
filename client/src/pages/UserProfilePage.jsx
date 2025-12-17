import React, { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/user-profile.css';

export default function UserProfilePage() {
  const { user, updateProfile, logout } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dietaryRestrictions: user?.dietaryRestrictions || [],
    preferredDiningTime: user?.preferredDiningTime || '',
    allergies: user?.allergies || '',
    specialRequests: user?.specialRequests || '',
    notifications: {
      orderUpdates: user?.notifications?.orderUpdates !== false,
      promotions: user?.notifications?.promotions !== false,
      newMenuItems: user?.notifications?.newMenuItems !== false,
      reservations: user?.notifications?.reservations !== false,
    },
  });

  const [successMessage, setSuccessMessage] = useState('');

  // Mock order history data
  const orderHistory = [
    {
      id: 'ORD-001',
      date: '2024-12-15',
      time: '19:30',
      items: ['Grilled Salmon', 'Caesar Salad', 'Chocolate Cake'],
      total: 45.50,
      status: 'Completed',
      table: 5,
    },
    {
      id: 'ORD-002',
      date: '2024-12-10',
      time: '18:45',
      items: ['Margherita Pizza', 'Garlic Bread', 'Tiramisu'],
      total: 32.75,
      status: 'Completed',
      table: 8,
    },
    {
      id: 'ORD-003',
      date: '2024-12-05',
      time: '20:00',
      items: ['Ribeye Steak', 'Baked Potato', 'House Wine'],
      total: 68.00,
      status: 'Completed',
      table: 12,
    },
    {
      id: 'ORD-004',
      date: '2024-11-28',
      time: '19:15',
      items: ['Chicken Tikka Masala', 'Naan Bread', 'Mango Lassi'],
      total: 28.50,
      status: 'Completed',
      table: 3,
    },
  ];

  // Mock favorite items
  const favoriteItems = [
    { id: 1, name: 'Grilled Salmon', category: 'Main Course', price: 24.99, rating: 4.8 },
    { id: 2, name: 'Caesar Salad', category: 'Appetizer', price: 9.99, rating: 4.6 },
    { id: 3, name: 'Chocolate Cake', category: 'Dessert', price: 7.99, rating: 4.9 },
    { id: 4, name: 'Margherita Pizza', category: 'Main Course', price: 14.99, rating: 4.7 },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('notification_')) {
      const notifKey = name.replace('notification_', '');
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notifKey]: checked,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDietaryToggle = (restriction) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="user-profile-page">
      {successMessage && (
        <div className="success-banner">
          <span>✓ {successMessage}</span>
        </div>
      )}

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-container">
          <div className="profile-header-content">
            <div className="profile-avatar">
              <span className="avatar-placeholder">
                {formData.firstName?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="profile-info">
              <h1>
                {formData.firstName || 'Guest User'}
                {formData.lastName && ` ${formData.lastName}`}
              </h1>
              <p className="user-type">
                {user?.type === 'manager' ? '👨‍💼 Manager Account' : '🍽️ Dining Guest'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📋 Order History
        </button>
        <button
          className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          ❤️ Favorites
        </button>
        <button
          className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          ⚙️ Preferences
        </button>
        <button
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          🔧 Settings
        </button>
      </div>

      <div className="profile-container">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <section className="tab-content">
            <div className="section-header">
              <h2>Personal Information</h2>
              <button
                className={`button ${isEditing ? 'danger' : 'primary'}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? '✕ Cancel' : '✎ Edit'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Allergies & Restrictions</label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    placeholder="List any allergies or dietary restrictions"
                    className="input textarea"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any special requests or preferences"
                    className="input textarea"
                    rows="3"
                  />
                </div>

                <button type="submit" className="button primary large">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="profile-info-display">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">First Name</span>
                    <span className="info-value">{formData.firstName || 'Not provided'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Name</span>
                    <span className="info-value">{formData.lastName || 'Not provided'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{formData.email || 'Not provided'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{formData.phone || 'Not provided'}</span>
                  </div>
                  <div className="info-item full-width">
                    <span className="info-label">Allergies & Restrictions</span>
                    <span className="info-value">{formData.allergies || 'None specified'}</span>
                  </div>
                  <div className="info-item full-width">
                    <span className="info-label">Special Requests</span>
                    <span className="info-value">{formData.specialRequests || 'None specified'}</span>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Order History Tab */}
        {activeTab === 'orders' && (
          <section className="tab-content">
            <div className="section-header">
              <h2>Order History</h2>
              <span className="order-count">{orderHistory.length} orders</span>
            </div>

            {orderHistory.length > 0 ? (
              <div className="orders-list">
                {orderHistory.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-id-date">
                        <h3>{order.id}</h3>
                        <p>{new Date(order.date).toLocaleDateString()} at {order.time}</p>
                      </div>
                      <div className="order-status">
                        <span className={`badge status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="order-details">
                      <div className="detail-item">
                        <span className="label">Table</span>
                        <span className="value">#{order.table}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Items</span>
                        <div className="items-list">
                          {order.items.map((item, idx) => (
                            <span key={idx} className="item-tag">{item}</span>
                          ))}
                        </div>
                      </div>
                      <div className="detail-item">
                        <span className="label">Total</span>
                        <span className="value amount">${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="order-actions">
                      <button className="button ghost small">View Details</button>
                      <button className="button ghost small">Reorder</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>📋 No orders yet</p>
              </div>
            )}
          </section>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <section className="tab-content">
            <div className="section-header">
              <h2>Favorite Items</h2>
              <span className="count">{favoriteItems.length} favorites</span>
            </div>

            {favoriteItems.length > 0 ? (
              <div className="favorites-grid">
                {favoriteItems.map(item => (
                  <div key={item.id} className="favorite-card">
                    <div className="favorite-header">
                      <h3>{item.name}</h3>
                      <button className="heart-button">❤️</button>
                    </div>
                    <p className="category">{item.category}</p>
                    <div className="favorite-footer">
                      <span className="price">${item.price.toFixed(2)}</span>
                      <span className="rating">⭐ {item.rating}</span>
                    </div>
                    <button className="button primary small">Add to Cart</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>❤️ No favorite items yet</p>
              </div>
            )}
          </section>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <section className="tab-content">
            <div className="section-header">
              <h2>Dining Preferences</h2>
            </div>

            <form className="preferences-form">
              <div className="form-group">
                <label>Preferred Dining Time</label>
                <select
                  name="preferredDiningTime"
                  value={formData.preferredDiningTime}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="">Select preferred time</option>
                  <option value="lunch">Lunch (11:00 AM - 2:00 PM)</option>
                  <option value="afternoon">Afternoon (2:00 PM - 5:00 PM)</option>
                  <option value="dinner">Dinner (5:00 PM - 10:00 PM)</option>
                  <option value="late">Late Night (10:00 PM+)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Dietary Restrictions</label>
                <div className="dietary-options">
                  {[
                    { value: 'vegetarian', label: '🥬 Vegetarian' },
                    { value: 'vegan', label: '🌱 Vegan' },
                    { value: 'glutenfree', label: '🍞 Gluten Free' },
                    { value: 'dairyfree', label: '🥛 Dairy Free' },
                    { value: 'nutfree', label: '🥜 Nut Free' },
                    { value: 'lowsodium', label: '🧂 Low Sodium' },
                  ].map(option => (
                    <label key={option.value} className="dietary-option">
                      <input
                        type="checkbox"
                        checked={formData.dietaryRestrictions.includes(option.value)}
                        onChange={() => handleDietaryToggle(option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="button" className="button primary" onClick={() => setActiveTab('settings')}>
                Save Preferences
              </button>
            </form>
          </section>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <section className="tab-content">
            <div className="section-header">
              <h2>Account Settings</h2>
            </div>

            <div className="settings-group">
              <h3>Notifications</h3>
              <div className="settings-options">
                <label className="setting-item">
                  <input
                    type="checkbox"
                    name="notification_orderUpdates"
                    checked={formData.notifications.orderUpdates}
                    onChange={handleInputChange}
                  />
                  <div className="setting-content">
                    <span className="setting-title">Order Updates</span>
                    <span className="setting-description">Get notified about your order status</span>
                  </div>
                </label>

                <label className="setting-item">
                  <input
                    type="checkbox"
                    name="notification_promotions"
                    checked={formData.notifications.promotions}
                    onChange={handleInputChange}
                  />
                  <div className="setting-content">
                    <span className="setting-title">Promotions</span>
                    <span className="setting-description">Receive special offers and discounts</span>
                  </div>
                </label>

                <label className="setting-item">
                  <input
                    type="checkbox"
                    name="notification_newMenuItems"
                    checked={formData.notifications.newMenuItems}
                    onChange={handleInputChange}
                  />
                  <div className="setting-content">
                    <span className="setting-title">New Menu Items</span>
                    <span className="setting-description">Be notified about new dishes</span>
                  </div>
                </label>

                <label className="setting-item">
                  <input
                    type="checkbox"
                    name="notification_reservations"
                    checked={formData.notifications.reservations}
                    onChange={handleInputChange}
                  />
                  <div className="setting-content">
                    <span className="setting-title">Reservations</span>
                    <span className="setting-description">Reminders about your reservations</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="settings-group danger-zone">
              <h3>Danger Zone</h3>
              <button
                type="button"
                className="button danger large"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
