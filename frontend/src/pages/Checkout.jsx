import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'

function Checkout({ cartItems, user }) {
  const navigate = useNavigate()
  const [step, setStep] = useState('shipping')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.18
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + tax + shipping

  const handlePlaceOrder = () => {
    if (!user || !user.id) {
       alert('Please login to place an order')
       navigate('/login')
       return
    }

    // Validate form data
    if (Object.values(formData).some(val => !val)) {
      alert('Please fill in all fields')
      return
    }

    const orderData = {
      userId: user.id,
      subtotal,
      tax,
      shipping,
      total,
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    }

    const token = localStorage.getItem('token')
    fetch('/api/orders/place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    })
    .then(res => {
      if (res.ok) {
        alert('Order placed successfully!')
        navigate('/customer-dashboard')
      } else {
        alert('Failed to place order. Please try again.')
      }
    })
    .catch(err => {
      console.error('Order error:', err)
      alert('An error occurred. Please try again.')
    })
  }

  return (
    <div className="checkout-page">
      <h1 className="section-title">💳 Checkout</h1>

      <div className="checkout-container">
        {/* Steps */}
        <div className="checkout-steps">
          <div className={`step ${step === 'shipping' ? 'active' : 'completed'}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className={`step ${step === 'payment' ? 'active' : step === 'shipping' ? 'pending' : 'completed'}`}>
            <span className="step-number">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className={`step ${step === 'review' ? 'active' : 'pending'}`}>
            <span className="step-number">3</span>
            <span className="step-label">Review</span>
          </div>
        </div>

        <div className="checkout-content">
          {/* Main Form */}
          <div className="checkout-form">
            {step === 'shipping' && (
              <div className="form-section">
                <h2>Shipping Address</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New Delhi"
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Delhi"
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleChange}
                      placeholder="110001"
                    />
                  </div>
                </div>

                <button className="btn btn-primary btn-large" onClick={() => setStep('payment')}>
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="form-section">
                <h2>Payment Information</h2>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="3"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn btn-secondary" onClick={() => setStep('shipping')}>
                    Back
                  </button>
                  <button className="btn btn-primary" onClick={() => setStep('review')}>
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 'review' && (
              <div className="form-section">
                <h2>Order Review</h2>
                <div className="review-section">
                  <h3>Shipping Address</h3>
                  <p>{formData.firstName} {formData.lastName}</p>
                  <p>{formData.address}, {formData.city}, {formData.state} {formData.zipcode}</p>
                </div>

                <div className="review-section">
                  <h3>Order Items</h3>
                  {cartItems.map(item => (
                    <div key={item.id} className="review-item">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="form-actions">
                  <button className="btn btn-secondary" onClick={() => setStep('payment')}>
                    Back
                  </button>
                  <button className="btn btn-primary" onClick={handlePlaceOrder}>
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <aside className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <span>{item.name}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Checkout
