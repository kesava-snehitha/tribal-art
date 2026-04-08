import React, { useState } from 'react';
import './CustomCommission.css';

function CustomCommission({ isLoggedIn }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    artType: 'warli',
    dimensions: '',
    budget: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to backend
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        name: '', email: '', artType: 'warli', dimensions: '', budget: '', description: ''
      });
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="commission-page">
      <div className="commission-hero">
        <div className="commission-hero-content">
          <h1>Request a Custom Masterpiece</h1>
          <p>Commission our master tribal artisans to create a unique piece of art tailored precisely to your vision and space.</p>
        </div>
      </div>

      <div className="commission-container">
        <div className="commission-info">
          <h2>How it Works</h2>
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-text">
              <h3>Submit Your Vision</h3>
              <p>Share your ideas, preferred dimensions, and art style. The more details, the better our artisans can understand your need.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-text">
              <h3>Artisan Matching</h3>
              <p>We match your request with an artisan who specializes in your chosen tribal art form. They will review and accept.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-text">
              <h3>Creation & Updates</h3>
              <p>Receive updates as the artisan sources raw materials and begins crafting your bespoke piece.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">04</div>
            <div className="step-text">
              <h3>Delivery</h3>
              <p>Your unique masterpiece is safely packed and delivered directly from the artisan's village to your doorstep.</p>
            </div>
          </div>
        </div>

        <div className="commission-form-container">
          {submitted ? (
            <div className="commission-success">
              <div className="success-icon">✓</div>
              <h2>Request Submitted!</h2>
              <p>Thank you for supporting tribal artisans. We will review your commission request and get back to you with a quote within 48 hours.</p>
              <button onClick={() => setSubmitted(false)} className="btn-primary">Submit Another</button>
            </div>
          ) : (
            <form className="commission-form" onSubmit={handleSubmit}>
              <h2>Commission Request Form</h2>
              
              <div className="form-group row">
                <div className="input-field">
                  <label>Full Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div className="input-field">
                  <label>Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                </div>
              </div>

              <div className="form-group row">
                <div className="input-field">
                  <label>Art Form Style</label>
                  <select name="artType" value={formData.artType} onChange={handleChange}>
                    <option value="warli">Warli Painting</option>
                    <option value="madhubani">Madhubani</option>
                    <option value="gond">Gond Art</option>
                    <option value="bastar">Bastar Wooden Craft</option>
                    <option value="khavda">Khavda Pottery</option>
                    <option value="dhokra">Dhokra Metal Art</option>
                    <option value="other">Other/Unsure</option>
                  </select>
                </div>
                <div className="input-field">
                  <label>Estimated Budget (₹)</label>
                  <input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g. 5000 - 10000" />
                </div>
              </div>

              <div className="form-group">
                <label>Preferred Dimensions (if applicable)</label>
                <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="e.g. 4ft x 3ft canvas, or 1ft tall statue" />
              </div>

              <div className="form-group">
                <label>Describe Your Vision</label>
                <textarea 
                  name="description" 
                  required 
                  rows="5" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Tell us what you have in mind. Will it be a wall piece for your living room? Do you need specific colors or motifs?"
                ></textarea>
              </div>

              <button type="submit" className="submit-commission-btn">Submit Request</button>
              {!isLoggedIn && <p className="login-hint">Note: You may be asked to log in or create an account to finalize the commission.</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomCommission;
