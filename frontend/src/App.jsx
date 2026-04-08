import { useState, useEffect } from 'react'
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
import VirtualExhibition from './pages/VirtualExhibition'
import CustomCommission from './pages/CustomCommission'
import './App.css'

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [isLoggedIn, setIsLoggedIn] = useState(!!user)
  const [userRole, setUserRole] = useState(user?.role || null)
  const [cartItems, setCartItems] = useState(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`)
      return savedCart ? JSON.parse(savedCart) : []
    }
    return []
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems))
    }
  }, [cartItems, user])
  const { toasts, showToast, removeToast } = useToast()

  useEffect(() => {
    fetch('/api/hello')
      .then(res => {
        if (res.ok) return res.text()
        throw new Error('Network response was not ok')
      })
      .then(msg => {
        console.log('Backend connected:', msg)
      })
      .catch(err => console.error('Backend connection error:', err))
  }, [])

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setUserRole(userData.role)
    setUser(userData)
    localStorage.setItem('currentUser', JSON.stringify(userData))
    
    const savedCart = localStorage.getItem(`cart_${userData.id}`)
    setCartItems(savedCart ? JSON.parse(savedCart) : [])
    
    showToast(`Welcome, ${userData.fullName || 'User'}!`, 'success')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    setUser(null)
    localStorage.removeItem('currentUser')
    setCartItems([])
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
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} userRole={userRole} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
            <Route path="/products" element={<ProductListing cartItems={cartItems} setCartItems={setCartItems} onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductPage onAddToCart={handleAddToCart} isLoggedIn={isLoggedIn} user={user} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} user={user} />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard isLoggedIn={isLoggedIn} user={user} />} />
            <Route path="/artisan-dashboard" element={<ArtisanDashboard isLoggedIn={isLoggedIn} user={user} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard isLoggedIn={isLoggedIn} user={user} />} />
            <Route path="/cultural-verification" element={<CulturalVerification isLoggedIn={isLoggedIn} />} />
            <Route path="/exhibition" element={<VirtualExhibition />} />
            <Route path="/commission" element={<CustomCommission isLoggedIn={isLoggedIn} />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </Router>
  )
}

export default App
