import { useState } from 'react'
import './Dashboard.css'

function AdminDashboard({ isLoggedIn }) {
  const [activeTab, setActiveTab] = useState('overview')

  const pendingVerifications = [
    { id: 1, artisan: 'New Tribal Arts', products: 5, submittedDate: '2024-02-01', status: 'Pending' },
    { id: 2, artisan: 'Kumar Crafts', products: 8, submittedDate: '2024-02-02', status: 'Under Review' }
  ]

  const reportedIssues = [
    { id: 1, type: 'Fake Product', reporter: 'User123', product: 'Wooden Mask', status: 'Open' },
    { id: 2, type: 'Poor Quality', reporter: 'User456', product: 'Pottery Set', status: 'Resolved' }
  ]

  const stats = [
    { label: 'Total Users', value: '12,456', change: '+234' },
    { label: 'Active Products', value: '3,456', change: '+89' },
    { label: 'Monthly Revenue', value: '₹15,23,000', change: '+12%' },
    { label: 'Pending Verifications', value: '12', change: '-3' }
  ]

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>⚙️ Admin Dashboard</h1>
        <p>Welcome Admin!</p>
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
            <div className="profile-avatar">A</div>
            <h3>Admin User</h3>
            <p>admin@tribalart.com</p>
          </div>

          <nav className="dashboard-nav">
            <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              📊 Overview
            </button>
            <button className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
              👥 Manage Users
            </button>
            <button className={`nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
              📦 Manage Products
            </button>
            <button className={`nav-item ${activeTab === 'verifications' ? 'active' : ''}`} onClick={() => setActiveTab('verifications')}>
              ✓ Verifications ({pendingVerifications.length})
            </button>
            <button className={`nav-item ${activeTab === 'issues' ? 'active' : ''}`} onClick={() => setActiveTab('issues')}>
              ⚠️ Issues ({reportedIssues.length})
            </button>
            <button className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`} onClick={() => setActiveTab('transactions')}>
              💳 Transactions
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="content-section">
              <h2>Platform Overview</h2>
              <div className="overview-grid">
                <div className="overview-card">
                  <h4>Active Artisans</h4>
                  <p className="big-number">284</p>
                  <p className="description">Verified and active</p>
                </div>
                <div className="overview-card">
                  <h4>Customer Growth</h4>
                  <p className="big-number">+456</p>
                  <p className="description">This month</p>
                </div>
                <div className="overview-card">
                  <h4>Avg Order Value</h4>
                  <p className="big-number">₹2,145</p>
                  <p className="description">Last 30 days</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="content-section">
              <h2>Manage Users</h2>
              <input type="text" placeholder="Search users..." className="search-input" />
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>john@example.com</td>
                    <td>Customer</td>
                    <td>Jan 15, 2024</td>
                    <td><button className="action-btn">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'verifications' && (
            <div className="content-section">
              <h2>Pending Verifications</h2>
              <div className="verifications-list">
                {pendingVerifications.map(item => (
                  <div key={item.id} className="verification-item">
                    <div className="verification-info">
                      <h4>{item.artisan}</h4>
                      <p>{item.products} products pending review</p>
                      <p className="date">Submitted: {item.submittedDate}</p>
                    </div>
                    <span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span>
                    <button className="btn btn-primary">Review</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'issues' && (
            <div className="content-section">
              <h2>Reported Issues</h2>
              <div className="issues-list">
                {reportedIssues.map(issue => (
                  <div key={issue.id} className="issue-card">
                    <div className="issue-header">
                      <h4>{issue.type}</h4>
                      <span className={`badge ${issue.status.toLowerCase()}`}>{issue.status}</span>
                    </div>
                    <p className="issue-details">Product: {issue.product}</p>
                    <p className="issue-details">Reported by: {issue.reporter}</p>
                    <button className="btn btn-secondary">Investigate</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="content-section">
              <h2>Transactions</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TXN001</td>
                    <td>₹2,499</td>
                    <td>Purchase</td>
                    <td>Feb 1, 2024</td>
                    <td><span className="badge badge-success">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
