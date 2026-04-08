import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Navigation.css'

function Navigation({ isLoggedIn, userRole, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const handleNavigation = (path) => {
    navigate(path)
    setMobileMenuOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎨</span>
          TribalArt
        </Link>

        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Products</Link>

          {isLoggedIn && userRole === 'customer' && (
            <>
              <Link to="/customer-dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
              <Link to="/cart" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
            </>
          )}

          {isLoggedIn && userRole === 'artisan' && (
            <>
              <Link to="/artisan-dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>My Store</Link>
              <Link to="/cultural-verification" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Verify Products</Link>
            </>
          )}

          {isLoggedIn && userRole === 'admin' && (
            <Link to="/admin-dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>
          )}

          <div className="nav-auth">
            {isLoggedIn ? (
              <>
                <span className="user-role">{userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}</span>
                <button className="nav-btn logout-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="nav-btn login-btn">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="nav-btn signup-btn">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>

        <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navigation
