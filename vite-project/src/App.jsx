import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ToastContainer, { useToast } from './components/Toast'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProductListing from './pages/ProductListing'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import CustomerDashboard from './pages/CustomerDashboard'
import ArtisanDashboard from './pages/ArtisanDashboard'
import AdminDashboard from './pages/AdminDashboard'
import CulturalVerification from './pages/CulturalVerification'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const { toasts, showToast, removeToast } = useToast()

  const handleLogin = (role) => {
    setIsLoggedIn(true)
    setUserRole(role)
    showToast(`Welcome back! Logged in as ${role}`, 'success')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    showToast('Logged out successfully', 'success')
  }

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item
      ))
      showToast(`Updated quantity of ${product.name}`, 'success')
    } else {
      setCartItems([...cartItems, { ...product, quantity: product.quantity || 1 }])
      showToast(`${product.name} added to cart!`, 'success')
    }
  }

  return (
    <Router>
      <div className="app-container">
        <Navigation isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
            <Route path="/products" element={<ProductListing cartItems={cartItems} setCartItems={setCartItems} onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductPage onAddToCart={handleAddToCart} isLoggedIn={isLoggedIn} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard isLoggedIn={isLoggedIn} />} />
            <Route path="/artisan-dashboard" element={<ArtisanDashboard isLoggedIn={isLoggedIn} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard isLoggedIn={isLoggedIn} />} />
            <Route path="/cultural-verification" element={<CulturalVerification isLoggedIn={isLoggedIn} />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </Router>
  )
}

export default App
