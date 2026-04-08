import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

function Signup({ onSignup }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userRole: 'customer',
    phone: '',
    address: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      onSignup(formData.userRole)
      navigate('/')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Join TribalArt</h2>
          <p>Create your account to get started</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="role-selector">
            <label className={`role-option ${formData.userRole === 'customer' ? 'active' : ''}`}>
              <input
                type="radio"
                name="userRole"
                value="customer"
                checked={formData.userRole === 'customer'}
                onChange={handleChange}
              />
              👤 Customer
            </label>
            <label className={`role-option ${formData.userRole === 'artisan' ? 'active' : ''}`}>
              <input
                type="radio"
                name="userRole"
                value="artisan"
                checked={formData.userRole === 'artisan'}
                onChange={handleChange}
              />
              🎨 Artisan
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-footer">
            <label className="agree-terms">
              <input type="checkbox" required />
              I agree to the Terms & Conditions
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>

      <div className="auth-side">
        <h3>🎨 Why Join TribalArt?</h3>
        <ul>
          <li>✓ 100% Authentic Products</li>
          <li>✓ Verified by Cultural Experts</li>
          <li>✓ Direct Support to Artisans</li>
          <li>✓ Build Your Community</li>
          <li>✓ Secure Payments</li>
        </ul>
      </div>
    </div>
  )
}

export default Signup
