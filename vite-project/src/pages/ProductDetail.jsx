import { useParams, Link } from 'react-router-dom'
import ReviewCard from '../components/ReviewCard'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.webp'
import img3 from '../assets/3.webp'
import img4 from '../assets/4.webp'
import './ProductDetail.css'

function ProductDetail({ cartItems, setCartItems }) {
  const { id } = useParams()
  const [quantity, setQuantity] = React.useState(1)

  const productDetails = {
    id: parseInt(id) || 1,
    name: 'Handwoven Tribal Basket',
    artisan: 'Lakshmi Artisans',
    price: 1299,
    originalPrice: 1599,
    image: img1,
    gallery: [
      img1,
      img2,
      img3,
    ],
    rating: 5,
    reviews: 124,
    inStock: true,
    category: 'Textiles',
    isVerified: true,
    description: `Authentic handwoven tribal basket crafted using traditional techniques passed down through generations. Each basket is unique and features intricate patterns that reflect the cultural heritage of the artisan community.`,
    features: [
      'Handwoven with natural materials',
      'Traditional tribal patterns',
      'Eco-friendly and sustainable',
      'Measures 25cm x 20cm',
      'Perfect for storage and decoration'
    ],
    shipping: 'Free shipping on orders above ₹500',
    returns: '30-day returns policy',
    artisanInfo: {
      name: 'Lakshmi Artisans Co-operative',
      location: 'Madhya Pradesh, India',
      since: '2010',
      products: 156,
      followers: 5234
    },
    reviews: [
      {
        reviewer: 'Rajesh Kumar',
        rating: 5,
        title: 'Excellent quality!',
        text: 'Beautiful basket with great craftsmanship. Exactly as described. Highly recommend!',
        date: '2 months ago',
        verified: true,
        helpful: 24,
        notHelpful: 2
      },
      {
        reviewer: 'Priya Singh',
        rating: 4,
        title: 'Good product',
        text: 'Nice quality but slightly different color than expected. Still very satisfied.',
        date: '3 months ago',
        verified: true,
        helpful: 15,
        notHelpful: 1
      }
    ]
  }

  const handleAddToCart = () => {
    const existingItem = cartItems.find(item => item.id === productDetails.id)
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === productDetails.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...productDetails, quantity }])
    }
    setQuantity(1)
  }

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{productDetails.category}</span>
      </div>

      <div className="product-detail-container">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={productDetails.image} alt={productDetails.name} />
          </div>
          <div className="gallery">
            {productDetails.gallery.map((img, index) => (
              <img key={index} src={img} alt={`Gallery ${index}`} />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="badges">
            {productDetails.isVerified && <span className="badge badge-success">✓ Verified Authentic</span>}
            {productDetails.rating === 5 && <span className="badge badge-warning">⭐ Best Seller</span>}
          </div>

          <h1>{productDetails.name}</h1>

          <div className="rating-section">
            <span className="stars">{'⭐'.repeat(productDetails.rating)}</span>
            <span className="rating-count">({productDetails.reviews} reviews)</span>
          </div>

          <div className="price-section">
            <span className="current-price">₹{productDetails.price}</span>
            {productDetails.originalPrice && (
              <span className="original-price">₹{productDetails.originalPrice}</span>
            )}
            <span className="discount">20% OFF</span>
          </div>

          <div className="description">
            <p>{productDetails.description}</p>
          </div>

          <div className="features-list">
            <h3>Key Features:</h3>
            <ul>
              {productDetails.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          <div className="purchase-section">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-input">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} min="1" />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button className="btn btn-primary btn-large" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
            <button className="btn btn-secondary btn-large">
              ❤️ Add to Wishlist
            </button>
          </div>

          <div className="shipping-info">
            <p>🚚 {productDetails.shipping}</p>
            <p>↩️ {productDetails.returns}</p>
          </div>

          {/* Artisan Card */}
          <div className="artisan-card">
            <h3>About the Artisan</h3>
            <p className="artisan-name">{productDetails.artisanInfo.name}</p>
            <p className="artisan-location">📍 {productDetails.artisanInfo.location}</p>
            <div className="artisan-stats">
              <div className="stat">
                <p className="stat-value">{productDetails.artisanInfo.since}</p>
                <p className="stat-label">Established</p>
              </div>
              <div className="stat">
                <p className="stat-value">{productDetails.artisanInfo.products}</p>
                <p className="stat-label">Products</p>
              </div>
              <div className="stat">
                <p className="stat-value">{productDetails.artisanInfo.followers}</p>
                <p className="stat-label">Followers</p>
              </div>
            </div>
            <button className="btn btn-secondary">Follow Artisan</button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="reviews-container">
          <div className="reviews-summary">
            <div className="average-rating">
              <p className="rating-number">{productDetails.rating}.0</p>
              <p className="rating-stars">{'⭐'.repeat(productDetails.rating)}</p>
              <p className="rating-based">Based on {productDetails.reviews} reviews</p>
            </div>
            <div className="rating-breakdown">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="rating-bar">
                  <span>{star}⭐</span>
                  <div className="bar">
                    <div className="fill" style={{ width: `${star === 5 ? 85 : star === 4 ? 12 : 3}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reviews-list">
            <div className="add-review">
              <h4>Share Your Review</h4>
              <button className="btn btn-primary">Write a Review</button>
            </div>
            {productDetails.reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
export default ProductDetail
