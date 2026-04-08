# TribalArt Frontend - Quick Reference Guide

## 🚀 Quick Access Links

After running `npm run dev`, the application will be available at:
- **Local:** http://localhost:5174
- **Development:** Hot module replacement enabled
- **Build:** `npm run build`

---

## 📍 Page Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Landing page with showcase |
| `/login` | Login | User authentication |
| `/signup` | Signup | New user registration |
| `/products` | ProductListing | Browse products with filters |
| `/product/:id` | ProductDetail | Single product details |
| `/cart` | Cart | Shopping cart management |
| `/checkout` | Checkout | Multi-step checkout process |
| `/customer-dashboard` | CustomerDashboard | Customer account (requires login) |
| `/artisan-dashboard` | ArtisanDashboard | Artisan store (requires artisan role) |
| `/admin-dashboard` | AdminDashboard | Admin control panel (requires admin) |
| `/cultural-verification` | CulturalVerification | Verification panel (expert only) |

---

## 🎭 User Roles

### Test Credentials (Demo)
- **Role:** customer | artisan | admin
- Just select on login, no password needed (demo mode)

---

## 🧬 Component Structure

### Navigation.jsx
```jsx
<Navigation 
  isLoggedIn={boolean} 
  userRole={'customer'|'artisan'|'admin'} 
  onLogout={function}
/>
```

### ProductCard.jsx
```jsx
<ProductCard 
  product={{id, name, price, image, rating, ...}} 
  onAddToCart={function}
/>
```

### ReviewCard.jsx
```jsx
<ReviewCard 
  review={{reviewer, rating, title, text, date, verified, helpful}}
/>
```

---

## 🎨 CSS Architecture

### Global Classes Available

```css
/* Buttons */
.btn .btn-primary .btn-secondary .btn-danger .btn-success

/* Layouts */
.grid .grid-2 .grid-3 .grid-4

/* Forms */
.form-group label input textarea select

/* Alerts */
.alert .alert-success .alert-error .alert-info

/* Badges */
.badge .badge-success .badge-warning .badge-danger

/* Stars/Ratings */
.stars (automatically renders stars)
```

---

## 📦 Key State Variables (App.jsx)

```javascript
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [userRole, setUserRole] = useState(null)
const [cartItems, setCartItems] = useState([])
```

---

## 🛒 Cart Item Structure

```javascript
{
  id: number,
  name: string,
  price: number,
  image: string,
  quantity: number,
  artisan: string,
  category: string
}
```

---

## 🎯 Common Functions

### Adding to Cart
```javascript
const handleAddToCart = (product) => {
  const existingItem = cartItems.find(item => item.id === product.id)
  if (existingItem) {
    setCartItems(cartItems.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ))
  } else {
    setCartItems([...cartItems, { ...product, quantity: 1 }])
  }
}
```

### Calculating Cart Total
```javascript
const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
const tax = subtotal * 0.18
const shipping = subtotal > 500 ? 0 : 50
const total = subtotal + tax + shipping
```

---

## 🎨 Customization Guide

### Change Primary Color
1. Open `src/App.css`
2. Search for `#8b5a3c` (primary brown)
3. Replace with desired color
4. Update complementary color `#d4a574` (light brown)
5. Update `#6d4630` (dark brown variant)

### Update Navigation
Edit `src/components/Navigation.jsx` and `Navigation.css`

### Modify Product Card
Edit `src/components/ProductCard.jsx` and `ProductCard.css`

### Add New Page
1. Create file in `src/pages/NewPage.jsx`
2. Create `src/pages/NewPage.css`
3. Add route in `App.jsx`
4. Add navigation link in `Navigation.jsx`

---

## 🔌 Backend Integration Points

### Current Mock Data
- Home page: 4 featured products
- ProductListing: 8 test products
- ProductDetail: Single product details
- Dashboards: Sample data

### To Connect Backend:
1. Replace `fetch()` calls with actual API endpoints
2. Update state management for real data
3. Implement proper error handling
4. Add loading states
5. Secure authentication tokens

---

## 📊 Dashboard Data Structure

### Customer Orders
```javascript
{
  id: 'ORD001',
  date: '2024-01-15',
  status: 'Delivered',
  total: 2499,
  items: 2
}
```

### Artisan Products
```javascript
{
  id: 1,
  name: 'Product Name',
  price: 1299,
  sold: 156,
  stock: 45,
  status: 'Active'
}
```

### Admin Statistics
```javascript
{
  label: 'Total Users',
  value: '12,456',
  change: '+234'
}
```

---

## 🛠️ Development Tips

### Hot Reload
Changes are automatically reflected - no refresh needed

### Console Debugging
Open browser dev tools (F12) to debug:
- Check component state
- Monitor network requests
- View error messages

### Responsive Testing
Use browser dev tools device emulation to test:
- Mobile (375px width)
- Tablet (768px width)
- Desktop (1024px+ width)

### Performance
- Use React DevTools for component profiling
- Check Network tab for load times
- Monitor memory usage

---

## 📝 File Naming Conventions

```
Components:  PascalCase      (ProductCard.jsx)
Pages:       PascalCase      (HomePage.jsx)
CSS Files:   kebab-case      (product-card.css)
Functions:   camelCase       (handleAddToCart)
Constants:   UPPER_CASE      (API_URL)
```

---

## 🐛 Common Issues & Solutions

### Issue: CSS not loading
**Solution:** Check file path in import statement matches actual file

### Issue: Component not rendering
**Solution:** Check route in App.jsx, verify import statement

### Issue: Cart not updating
**Solution:** Ensure state update syntax is correct (create new array/object)

### Issue: Images not showing
**Solution:** Placeholder URLs used; replace with actual image paths

---

## 📚 Best Practices

1. **Keep Components Modular**
   - One component per file
   - Reusable components in `/components`

2. **Manage State Properly**
   - Lift state up to parent when shared
   - Use props drilling or context for deep nesting

3. **CSS Organization**
   - Component CSS in same folder
   - Global CSS in App.css
   - Utility classes in App.css

4. **Form Handling**
   - Always validate on submit
   - Show user feedback
   - Clear form after success

5. **Performance**
   - Use key prop in lists
   - Memoize expensive components
   - Lazy load images

---

## 🚀 Deployment Checklist

- [ ] Test all routes
- [ ] Verify responsive design
- [ ] Check form validation
- [ ] Test on different browsers
- [ ] Optimize images
- [ ] Remove console.logs
- [ ] Update API endpoints
- [ ] Set environment variables
- [ ] Review security measures
- [ ] Build and test production bundle

---

## 📞 File References

| File | Purpose | Key Content |
|------|---------|-------------|
| App.jsx | Main router | Routes & state |
| Navigation.jsx | Header bar | Logo & links |
| Home.jsx | Landing | Hero & showcase |
| ProductListing.jsx | Catalog | Filters & grid |
| ProductDetail.jsx | Single item | Details & reviews |
| Cart.jsx | Cart page | Items & summary |
| Checkout.jsx | Payment | Multi-step form |
| Dashboards | User panels | Role-specific views |

---

## 💡 Next Steps

1. **Connect Backend API**
   - Replace mock data with real endpoints
   - Implement authentication
   - Add error handling

2. **Add Features**
   - Search functionality
   - Advanced filtering
   - Wishlist persistence
   - Order notifications

3. **Optimize Performance**
   - Code splitting
   - Image optimization
   - Lazy loading

4. **Security**
   - Input validation
   - Token management
   - HTTPS enforcement

---

**Ready to build? Happy coding! 🎨**
