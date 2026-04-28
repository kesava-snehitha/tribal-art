import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userRole, setUserRole] = useState('customer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(async res => {
        const data = await res.json()
        if (res.ok) {
          localStorage.setItem('token', data.token)
          onLogin({ ...data.user, role: data.role })
          navigate('/')
        } else {
          setError(data.error || 'Invalid email or password')
        }
      })
      .catch(err => {
        setError('Network error occurred. Please make sure backend is running.')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back!</h2>
          <p>Sign in to your TribalArt account</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="role-selector">
            <label className={`role-option ${userRole === 'customer' ? 'active' : ''}`}>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={userRole === 'customer'}
                onChange={(e) => setUserRole(e.target.value)}
              />
              👤 Customer
            </label>
            <label className={`role-option ${userRole === 'artisan' ? 'active' : ''}`}>
              <input
                type="radio"
                name="role"
                value="artisan"
                checked={userRole === 'artisan'}
                onChange={(e) => setUserRole(e.target.value)}
              />
              🎨 Artisan
            </label>
            <label className={`role-option ${userRole === 'admin' ? 'active' : ''}`}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={userRole === 'admin'}
                onChange={(e) => setUserRole(e.target.value)}
              />
              ⚙️ Admin
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-footer">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="social-login">
          <button className="social-btn google-btn">Google</button>
          <button className="social-btn facebook-btn">Facebook</button>
        </div>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>

      <div className="auth-side">
        <h3>🎨 TribalArt Community</h3>
        <ul>
          <li>✓ Authentic tribal products</li>
          <li>✓ Support local artisans</li>
          <li>✓ Preserve cultural heritage</li>
          <li>✓ Direct artisan-buyer connection</li>
        </ul>
      </div>
    </div>
  )
}

export default Login
