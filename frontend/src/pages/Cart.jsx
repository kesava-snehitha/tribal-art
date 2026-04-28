import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Cart.css'

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate()

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id)
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ))
    }
  }

  const [calculations, setCalculations] = useState({ subtotal: 0, tax: 0, shipping: 0, total: 0 })

  useEffect(() => {
    if (cartItems.length > 0) {
      const token = localStorage.getItem('token') || '';
      fetch('/api/cart/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cartItems.map(item => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity
        }))),
      })
      .then(res => {
        if (!res.ok) throw new Error('Calculation failed');
        return res.json();
      })
      .then(data => setCalculations(data))
      .catch(err => {
        console.error('Calculation error:', err);
        setCalculations({ subtotal: 0, tax: 0, shipping: 0, total: 0 });
      })
    } else {
      setCalculations({ subtotal: 0, tax: 0, shipping: 0, total: 0 })
    }
  }, [cartItems])

  const { subtotal = 0, tax = 0, shipping = 0, total = 0 } = calculations || {}

  return (
    <div className="cart-page">
      <h1 className="section-title">🛒 Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-state">
            <h3>Your cart is empty</h3>
            <p>Start shopping to add items to your cart</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-artisan">by {item.artisan}</p>
                  <p className="item-category">{item.category}</p>
                </div>
                <div className="item-quantity">
                  <label>Qty:</label>
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>−</button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      min="1"
                    />
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="item-price">
                  <p className="unit-price">₹{item.price}</p>
                  <p className="total-price">₹{item.price * item.quantity}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Tax (18% GST)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free' : ''}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>

            {shipping > 0 && (
              <p className="free-shipping-hint">
                Add ₹{(500 - subtotal).toFixed(2)} more for free shipping!
              </p>
            )}

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-primary btn-large"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>

            <Link to="/products" className="btn btn-secondary">
              Continue Shopping
            </Link>

            <div className="shipping-promise">
              <p>✓ Free returns</p>
              <p>✓ Secure payment</p>
              <p>✓ Authentic products</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default Cart
