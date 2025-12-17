import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Update user profile
  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  // Set user from guest token
  const setGuestUser = (tableNumber, token) => {
    setUser({
      type: 'guest',
      tableNumber,
      token,
      createdAt: new Date().toISOString(),
    });
  };

  // Set user from manager login
  const setManagerUser = (userData, token) => {
    setUser({
      ...userData,
      type: 'manager',
      token,
      loginTime: new Date().toISOString(),
    });
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, error, updateProfile, setGuestUser, setManagerUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
