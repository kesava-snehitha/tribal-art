import { useState } from 'react'
import './Dashboard.css'

function CulturalVerification({ isLoggedIn }) {
  const [activeTab, setActiveTab] = useState('pending')

  const pendingProducts = [
    { id: 1, productName: 'Tribal Wooden Mask', artisan: 'Kumar Crafts', description: 'Hand-carved mask', status: 'Pending', submittedDate: '2024-02-01' },
    { id: 2, productName: 'Beaded Necklace', artisan: 'Priya Jewelry', description: 'Traditional beads', status: 'Pending', submittedDate: '2024-02-02' }
  ]

  const approvedProducts = [
    { id: 1, productName: 'Handwoven Basket', artisan: 'Lakshmi Artisans', approvedDate: '2024-01-15', verifier: 'Dr. Sharma' }
  ]

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>✓ Cultural Verification Panel</h1>
        <p>Verify authenticity of tribal products</p>
      </div>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="user-profile">
            <div className="profile-avatar">C</div>
            <h3>Dr. Sharma</h3>
            <p>Cultural Expert</p>
          </div>

          <nav className="dashboard-nav">
            <button className={`nav-item ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
              ⏳ Pending Review ({pendingProducts.length})
            </button>
            <button className={`nav-item ${activeTab === 'approved' ? 'active' : ''}`} onClick={() => setActiveTab('approved')}>
              ✓ Approved
            </button>
            <button className={`nav-item ${activeTab === 'rejected' ? 'active' : ''}`} onClick={() => setActiveTab('rejected')}>
              ✕ Rejected
            </button>
            <button className={`nav-item ${activeTab === 'guidelines' ? 'active' : ''}`} onClick={() => setActiveTab('guidelines')}>
              📋 Guidelines
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          {activeTab === 'pending' && (
            <div className="content-section">
              <h2>Pending Verification</h2>
              <div className="verification-queue">
                {pendingProducts.map(product => (
                  <div key={product.id} className="product-review-card">
                    <div className="review-info">
                      <h4>{product.productName}</h4>
                      <p className="artisan-info">Artisan: {product.artisan}</p>
                      <p className="product-desc">Description: {product.description}</p>
                      <p className="submitted-date">Submitted: {product.submittedDate}</p>
                    </div>

                    <div className="verification-checklist">
                      <h5>Verification Criteria:</h5>
                      <label className="checklist-item">
                        <input type="checkbox" />
                        Authentic cultural origin
                      </label>
                      <label className="checklist-item">
                        <input type="checkbox" />
                        Traditional techniques used
                      </label>
                      <label className="checklist-item">
                        <input type="checkbox" />
                        Quality of craftsmanship
                      </label>
                      <label className="checklist-item">
                        <input type="checkbox" />
                        Proper documentation
                      </label>
                    </div>

                    <textarea placeholder="Verification notes..." rows="3" style={{width: '100%', marginTop: '15px'}}></textarea>

                    <div className="verification-actions">
                      <button className="btn btn-success">✓ Approve</button>
                      <button className="btn btn-danger">✕ Reject</button>
                      <button className="btn btn-secondary">More Info</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'approved' && (
            <div className="content-section">
              <h2>Approved Products</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Artisan</th>
                    <th>Approved Date</th>
                    <th>Verified By</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.productName}</td>
                      <td>{product.artisan}</td>
                      <td>{product.approvedDate}</td>
                      <td>{product.verifier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'guidelines' && (
            <div className="content-section">
              <h2>Verification Guidelines</h2>
              <div className="guidelines-content">
                <h3>Criteria for Authentic Tribal Products</h3>
                <ul>
                  <li><strong>Cultural Origin:</strong> Must originate from recognized tribal communities</li>
                  <li><strong>Traditional Techniques:</strong> Use of traditional/historical methods</li>
                  <li><strong>Materials:</strong> Authentic materials as per cultural tradition</li>
                  <li><strong>Documentation:</strong> Proper proof of authenticity</li>
                  <li><strong>Quality:</strong> Meets minimum quality standards</li>
                  <li><strong>Ethical Production:</strong> Fair wages and safe working conditions</li>
                </ul>

                <h3>Verification Process</h3>
                <ol>
                  <li>Review product submission and documentation</li>
                  <li>Check against cultural authenticity guidelines</li>
                  <li>Verify artisan credentials and background</li>
                  <li>Inspect product photos and details</li>
                  <li>Make decision: Approve, Reject, or Request More Info</li>
                </ol>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default CulturalVerification
