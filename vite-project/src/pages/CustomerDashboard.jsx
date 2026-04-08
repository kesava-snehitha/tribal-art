import { useState } from 'react'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.webp'
import img3 from '../assets/3.webp'
import img4 from '../assets/4.webp'
import './Dashboard.css'

function CustomerDashboard({ isLoggedIn }) {
  const [activeTab, setActiveTab] = useState('orders')

  const orders = [
    { id: 'ORD001', date: '2024-01-15', status: 'Delivered', total: 2499, items: 2, image: img1 },
    { id: 'ORD002', date: '2024-01-20', status: 'In Transit', total: 1899, items: 1, image: img2 },
    { id: 'ORD003', date: '2024-02-01', status: 'Processing', total: 649, items: 1, image: img3 }
  ]

  const wishlist = [
    { id: 1, name: 'Tribal Wooden Mask', price: 2499, image: img3 },
    { id: 2, name: 'Silk Saree', price: 3499, image: img4 }
  ]

  const reviews = [
    { productName: 'Handwoven Basket', rating: 5, text: 'Excellent quality!', date: '2024-01-16' }
  ]

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
            <div className="profile-avatar">J</div>
            <h3>John Doe</h3>
            <p>john@example.com</p>
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
                      <img src={order.image} alt={order.id} />
                    </div>
                    <div className="order-info">
                      <p className="order-id">Order #{order.id}</p>
                      <p className="order-date">Placed on {order.date}</p>
                      <p className="order-items">{order.items} item(s)</p>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
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
                    <img src={item.image} alt={item.name} />
                    <h4>{item.name}</h4>
                    <p className="price">₹{item.price}</p>
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
                    <h4>{review.productName}</h4>
                    <p className="review-date">{review.date}</p>
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
                  <input type="text" defaultValue="John Doe" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue="john@example.com" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" defaultValue="+91 9876543210" />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea rows="3" defaultValue="123 Main Street, New Delhi"></textarea>
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
