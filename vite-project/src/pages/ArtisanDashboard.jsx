import { useState } from 'react'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.webp'
import './Dashboard.css'

function ArtisanDashboard({ isLoggedIn }) {
  const [activeTab, setActiveTab] = useState('products')

  const products = [
    { id: 1, name: 'Handwoven Basket', price: 1299, sold: 156, stock: 45, status: 'Active', image: img1 },
    { id: 2, name: 'Clay Pottery', price: 899, sold: 89, stock: 23, status: 'Active', image: img2 }
  ]

  const orders = [
    { id: 'ORD001', customer: 'Rajesh Kumar', items: 2, total: 2499, status: 'Completed', date: '2024-01-15' },
    { id: 'ORD002', customer: 'Priya Singh', items: 1, total: 1299, status: 'Pending', date: '2024-02-01' }
  ]

  const stats = [
    { label: 'Total Sales', value: '₹45,230', change: '+12%' },
    { label: 'Orders', value: '156', change: '+8%' },
    { label: 'Reviews', value: '4.8/5', change: '+2%' },
    { label: 'Followers', value: '5,234', change: '+25%' }
  ]

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>🎨 My Store</h1>
        <p>Welcome back, Artisan!</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-change">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="user-profile">
            <div className="profile-avatar">L</div>
            <h3>Lakshmi Artisans</h3>
            <p>Madhya Pradesh</p>
          </div>

          <nav className="dashboard-nav">
            <button className={`nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
              📦 My Products
            </button>
            <button className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
              📋 Orders
            </button>
            <button className={`nav-item ${activeTab === 'verification' ? 'active' : ''}`} onClick={() => setActiveTab('verification')}>
              ✓ Verification
            </button>
            <button className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
              📊 Analytics
            </button>
            <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
              ⚙️ Settings
            </button>
          </nav>

          <button className="btn btn-primary btn-large" style={{marginTop: '20px', width: '100%'}}>
            ➕ Add New Product
          </button>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          {activeTab === 'products' && (
            <div className="content-section">
              <h2>My Products</h2>
              <div className="products-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Sold</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-cell">
                          <img src={product.image} alt={product.name} />
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>₹{product.price}</td>
                      <td>{product.sold}</td>
                      <td>{product.stock}</td>
                      <td><span className="badge badge-success">{product.status}</span></td>
                      <td>
                        <button className="action-btn">✏️</button>
                        <button className="action-btn">👁️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="content-section">
              <h2>Recent Orders</h2>
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-info">
                      <p className="order-id">Order #{order.id}</p>
                      <p className="customer-name">{order.customer}</p>
                      <p className="order-items">{order.items} item(s) - ₹{order.total}</p>
                    </div>
                    <span className="status-badge pending">{order.status}</span>
                    <button className="btn btn-secondary">Details</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="content-section">
              <h2>Verification Status</h2>
              <div className="verification-card">
                <h3>✓ Store Verified</h3>
                <p>Your store is verified and authentic</p>
                <div className="verification-details">
                  <p><strong>Verified on:</strong> January 15, 2024</p>
                  <p><strong>Verification type:</strong> Cultural Expert Review</p>
                  <p><strong>Products verified:</strong> 15/15</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="content-section">
              <h2>Analytics</h2>
              <div className="analytics-chart">
                <p>📊 Sales Analytics Dashboard</p>
                <p>Monthly sales trend, customer demographics, and product performance</p>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="content-section">
              <h2>Store Settings</h2>
              <form className="settings-form">
                <div className="form-group">
                  <label>Store Name</label>
                  <input type="text" defaultValue="Lakshmi Artisans Co-operative" />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" defaultValue="Madhya Pradesh, India" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea rows="4" defaultValue="Traditional tribal crafts since 2010"></textarea>
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

export default ArtisanDashboard
