import { useState, useEffect } from 'react'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.webp'
import img3 from '../assets/3.webp'
import img4 from '../assets/4.webp'
import './Dashboard.css'

function CustomerDashboard({ isLoggedIn, user }) {
  const [activeTab, setActiveTab] = useState('orders')

  const [dashboardData, setDashboardData] = useState({ orders: [], wishlist: [], reviews: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && user.id) {
      const token = localStorage.getItem('token')
      fetch(`/api/dashboard/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Unauthorized or fetch failed')
          return res.json()
        })
        .then(data => {
          setDashboardData(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching dashboard data:', err)
          setLoading(false)
        })
    }
  }, [user])

  const { orders = [], wishlist = [], reviews = [] } = dashboardData || {}
  
  if (loading && user) return <div className="loading">Loading dashboard...</div>

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>👤 My Account</h1>
        <p>Welcome back, Customer!</p>
      </div>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="user-profile">
            <div className="profile-avatar">{user?.fullName?.charAt(0) || 'U'}</div>
            <h3>{user?.fullName || 'User'}</h3>
            <p>{user?.email}</p>
          </div>

          <nav className="dashboard-nav">
            <button className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
              📦 My Orders
            </button>
            <button className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`} onClick={() => setActiveTab('wishlist')}>
              ❤️ Wishlist
            </button>
            <button className={`nav-item ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
              ⭐ My Reviews
            </button>
            <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
              ⚙️ Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          {activeTab === 'orders' && (
            <div className="content-section">
              <h2>My Orders</h2>
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-image">
                       {/* Use product image from first item if available */}
                      <img src={order.items && order.items.length > 0 ? order.items[0].product.image : img1} alt={order.id} />
                    </div>
                    <div className="order-info">
                      <p className="order-id">Order #{order.id}</p>
                      <p className="order-date">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                      <p className="order-items">{order.items ? order.items.length : 0} item(s)</p>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${order.status ? order.status.toLowerCase().replace(' ', '-') : 'processing'}`}>
                        {order.status || 'Processing'}
                      </span>
                    </div>
                    <div className="order-total">
                      <p>₹{order.total}</p>
                    </div>
                    <button className="btn btn-secondary">View Details</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="content-section">
              <h2>My Wishlist</h2>
              <div className="wishlist-grid">
                {wishlist.map(item => (
                  <div key={item.id} className="wishlist-card">
                    <img src={item.product?.image || img3} alt={item.product?.name} />
                    <h4>{item.product?.name}</h4>
                    <p className="price">₹{item.product?.price}</p>
                    <button className="btn btn-primary">Add to Cart</button>
                    <button className="btn btn-danger">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="content-section">
              <h2>My Reviews</h2>
              {reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <h4>{review.product?.name || 'Unknown Product'}</h4>
                    <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <div className="stars">{'⭐'.repeat(review.rating)}</div>
                  <p>{review.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="content-section">
              <h2>Account Settings</h2>
              <form className="settings-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue={user?.fullName || ''} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue={user?.email || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" defaultValue={user?.phone || ''} />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea rows="3" defaultValue={user?.address || ''}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default CustomerDashboard
