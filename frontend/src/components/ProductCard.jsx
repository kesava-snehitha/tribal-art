import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart({ ...product, quantity })
      setQuantity(1) // Reset quantity after adding
    }
  }

  const handleQuantityChange = (e, delta) => {
    e.stopPropagation()
    setQuantity(prev => Math.max(1, prev + delta))
  }

  return (
    <div className="product-card" onClick={handleViewDetails}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <span className="product-badge">{product.category}</span>
        {product.isVerified && <span className="verified-badge">✓ Verified</span>}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-artisan">By: {product.artisan}</p>

        <div className="product-rating">
          <span className="stars">{'⭐'.repeat(product.rating)}</span>
          <span className="rating-count">({product.reviews} reviews)</span>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-quantity-selector" onClick={(e) => e.stopPropagation()}>
          <button className="quantity-btn" onClick={(e) => handleQuantityChange(e, -1)}>−</button>
          <span className="quantity-display">{quantity}</span>
          <button className="quantity-btn" onClick={(e) => handleQuantityChange(e, 1)}>+</button>
        </div>

        <div className="product-price-section">
          <span className="product-price">₹{product.price}</span>
          {product.originalPrice && (
            <span className="original-price">₹{product.originalPrice}</span>
          )}
        </div>

        <div className="product-actions">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="btn btn-secondary" onClick={handleViewDetails}>
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
