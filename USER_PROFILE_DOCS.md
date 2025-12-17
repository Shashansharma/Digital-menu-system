# User Profile Section - Complete Documentation

## 📋 Overview

The User Profile section is a comprehensive feature that allows users to manage their account, view order history, set preferences, and configure notification settings. It's accessible from the header navigation (👤 icon).

## 🎯 Features Implemented

### 1. **Personal Information Tab**
- **View & Edit Profile Details:**
  - First Name
  - Last Name
  - Email Address
  - Phone Number
  - Allergies & Dietary Restrictions
  - Special Requests/Preferences

- **Edit Mode:**
  - Click "Edit" button to modify information
  - Form validates before saving
  - Success notification appears after save
  - Cancel button to discard changes

### 2. **Order History Tab**
- **Complete Order Information:**
  - Order ID (e.g., ORD-001)
  - Date and Time of Order
  - Items Ordered (with detailed list)
  - Total Amount
  - Order Status (Completed, Pending, etc.)
  - Table Number

- **Order Actions:**
  - View Order Details button
  - Quick Reorder button to add items back to cart
  - Filter by date, status, or amount (extensible)

### 3. **Favorites Tab**
- **Favorite Items Display:**
  - Item Name
  - Category (Main Course, Appetizer, Dessert, etc.)
  - Price
  - Customer Rating (⭐)
  - Quick "Add to Cart" button
  - Heart icon to toggle favorites

- **Favorite Management:**
  - Easy bulk actions
  - Remove from favorites
  - Sort by category or rating

### 4. **Preferences Tab**
- **Dining Preferences:**
  - Preferred Dining Time
    - Lunch (11:00 AM - 2:00 PM)
    - Afternoon (2:00 PM - 5:00 PM)
    - Dinner (5:00 PM - 10:00 PM)
    - Late Night (10:00 PM+)

- **Dietary Restrictions:**
  - 🥬 Vegetarian
  - 🌱 Vegan
  - 🍞 Gluten Free
  - 🥛 Dairy Free
  - 🥜 Nut Free
  - 🧂 Low Sodium

- **Multi-select Options:**
  - Users can choose multiple dietary restrictions
  - Preferences save automatically
  - Used for personalized menu recommendations

### 5. **Settings Tab**
- **Notification Preferences:**
  - ✓ Order Updates - Get notified about order status
  - ✓ Promotions - Receive special offers and discounts
  - ✓ New Menu Items - Be notified about new dishes
  - ✓ Reservations - Reminders about reservations

- **Account Actions:**
  - Logout button (red danger zone)
  - Account security options
  - Privacy settings (extensible)

## 🗂️ File Structure

```
client/src/
├── pages/
│   └── UserProfilePage.jsx          # Main profile component
├── context/
│   └── UserContext.jsx              # User state management
└── styles/
    └── user-profile.css             # Premium styling
```

## 🔧 Context API (UserContext)

### Available Hooks

```javascript
import { useUser } from '../context/UserContext.jsx';

const { 
  user,                  // Current user object
  setUser,              // Set entire user object
  updateProfile,        // Update specific user properties
  setGuestUser,         // Set guest user from table
  setManagerUser,       // Set manager user from login
  logout,               // Clear user and tokens
  loading,              // Loading state
  error                 // Error state
} = useUser();
```

### User Object Structure

```javascript
{
  type: 'guest' | 'manager',           // User type
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  token: string,
  dietaryRestrictions: string[],       // Array of restrictions
  preferredDiningTime: string,
  allergies: string,
  specialRequests: string,
  notifications: {
    orderUpdates: boolean,
    promotions: boolean,
    newMenuItems: boolean,
    reservations: boolean
  },
  createdAt: ISO8601DateTime,          // For guests
  loginTime: ISO8601DateTime           // For managers
}
```

## 💾 Local Storage

User data is automatically persisted to localStorage:

```javascript
// Automatically saved
localStorage.setItem('user', JSON.stringify(user))

// Automatically removed on logout
localStorage.removeItem('user')
localStorage.removeItem('token')
```

## 🎨 Design Features

### Premium Styling
- **Gradient Header:** Blue gradient with smooth animations
- **Tab Navigation:** Interactive tabs with hover effects
- **Form Controls:** Modern inputs with focus states
- **Cards & Sections:** Clean, organized layout with shadows
- **Success Notifications:** Animated success banner
- **Responsive Design:** Mobile-first approach

### Color Scheme
- Primary: #4a90e2 (Blue)
- Success: #10b981 (Green)
- Danger: #ef4444 (Red)
- Backgrounds: Gradient from #f5f5f5 to #ffffff

### Animations
- Tab transitions with fade-in effect
- Button hover effects with scale & shadow
- Success banner slide-down animation
- Smooth color transitions on hover

## 📱 Responsive Breakpoints

- **Desktop:** Full-width layout with multi-column grids
- **Tablet (900px):** Adjusted grid layouts
- **Mobile (640px):** Single-column layout, stacked tabs
- All interactive elements remain accessible on mobile

## 🚀 Usage Examples

### Set Guest User
```javascript
import { useUser } from '../context/UserContext.jsx';

function TableMenuPage({ tableNumber }) {
  const { setGuestUser } = useUser();
  
  useEffect(() => {
    setGuestUser(tableNumber, token);
  }, []);
}
```

### Update User Profile
```javascript
function EditProfile() {
  const { updateProfile } = useUser();
  
  const handleSave = (data) => {
    updateProfile({
      firstName: data.firstName,
      email: data.email,
      // ... other fields
    });
  };
}
```

### Access User in Components
```javascript
function OrderCard() {
  const { user } = useUser();
  
  return (
    <div>
      <p>Hello, {user?.firstName}!</p>
      <p>Your allergies: {user?.allergies || 'None'}</p>
    </div>
  );
}
```

### Logout
```javascript
function LogoutButton() {
  const { logout } = useUser();
  
  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}
```

## 🔐 Security Considerations

- User data stored locally (client-side)
- Token stored in localStorage
- Sensitive data should be validated server-side
- For production, consider:
  - Server-side session management
  - Encrypted local storage
  - Server-side preference validation

## 🎯 Future Enhancements

### Planned Features
- [ ] Profile picture upload
- [ ] Saved payment methods
- [ ] Reservation management
- [ ] Loyalty points tracking
- [ ] Referral program
- [ ] Dining history analytics
- [ ] Smart recommendations based on preferences
- [ ] Export order history
- [ ] Birthday rewards
- [ ] VIP membership status

### Backend Integration
```javascript
// Current: Mock data
const orderHistory = [...]

// Future: API calls
const { data: orderHistory } = await api('/users/orders', { auth: true });
const { data: userData } = await api('/users/me', { auth: true });
```

## 🧪 Testing

### Test Cases
1. **Profile Editing:** Create new user → Edit profile → Verify save
2. **Tab Navigation:** Switch between all 5 tabs → Verify content loads
3. **Favorites:** Add/remove favorites → Persist on page reload
4. **Preferences:** Select dietary restrictions → Verify multi-select
5. **Notifications:** Toggle notifications → Verify settings save
6. **Logout:** Click logout → Verify redirect to home & localStorage clear
7. **Mobile Responsive:** Test on mobile, tablet, desktop devices

## 📞 Support

For issues or feature requests related to the User Profile section:
1. Check localStorage is enabled in browser
2. Verify UserProvider wraps CartProvider in App.jsx
3. Check console for context usage warnings
4. Ensure all route imports are correct

## 📄 License

Part of MenuDirect - Digital Menu Ordering System
