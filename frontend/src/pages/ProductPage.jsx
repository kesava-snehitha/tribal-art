import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RelatedProducts from '../components/RelatedProducts'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.webp'
import img3 from '../assets/3.webp'
import img4 from '../assets/4.webp'
import ceramicPlateImg from '../assets/ceramic-plate.png'
import tribalPaintingImg from '../assets/tribal-painting.png'
import woodenSculptureImg from '../assets/wooden-sculpture.png'
import './ProductPage.css'

function ProductPage({ onAddToCart, isLoggedIn, user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [loading, setLoading] = useState(true)

  const [product, setProduct] = useState(null)
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        // Ensure default properties for UI components
        data.gallery = [data.image, data.image, data.image]; // Mock gallery
        data.features = { 'Material': data.category || 'Standard' };
        data.seller = { name: data.artisan, followers: '1.2K', items: '10 products', verified: true, rating: 4.8 };
        data.details = "Authentic handmade product.";
        data.shipping = "Free shipping";
        data.returns = "30-day return policy";
        setProduct(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setProduct(null)
        setLoading(false)
      })

    // Fetch related products
    fetch(`/api/products`)
      .then(res => res.json())
      .then(data => setAllProducts(data))
      .catch(err => console.error(err))

    setQuantity(1)
    setSelectedImage(0)
    window.scrollTo(0, 0)
  }, [id])



  useEffect(() => {
    if (user && user.id) {
      fetch(`/api/dashboard/${user.id}`)
        .then(res => res.json())
        .then(data => {
          const wishlisted = data.wishlist || []
          setIsWishlisted(wishlisted.some(item => item.product.id === parseInt(id)))
        })
        .catch(err => console.error('Error checking wishlist:', err))
    }
  }, [id, user])

  if (loading) {
    return <div className="page-loading">Loading product...</div>
  }

  if (!product) {
    return (
      <div className="page-not-found">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Back to Products
        </button>
      </div>
    )
  }

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity })
    setQuantity(1)
  }

  const handleWishlist = () => {
    if (!user || !user.id) {
      navigate('/login')
      return
    }

    const method = isWishlisted ? 'DELETE' : 'POST'
    const action = isWishlisted ? 'remove' : 'add'

    fetch(`/api/wishlist/${user.id}/${action}/${product.id}`, {
      method: method
    })
    .then(res => {
      if (res.ok) {
        setIsWishlisted(!isWishlisted)
      }
    })
    .catch(err => console.error('Wishlist update error:', err))
  }

  return (
    <div className="product-page">
      <div className="breadcrumb">
        <button onClick={() => navigate('/products')} className="breadcrumb-link">Products</button>
        <span>/</span>
        <span className="breadcrumb-current">{product.category}</span>
        <span>/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      <div className="product-container">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.gallery[selectedImage]} alt={product.name} />
            {product.isVerified && <span className="verified-badge">✓ Verified</span>}
          </div>
          <div className="thumbnail-gallery">
            {product.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1>{product.name}</h1>

          <div className="product-meta">
            <div className="rating-section">
              <span className="rating-stars">⭐ {product.rating}/5</span>
              <span className="review-count">({product.reviews} reviews)</span>
            </div>
            <span className="artisan-link">by <strong>{product.artisan}</strong></span>
          </div>

          <div className="price-section">
            <span className="price-large">₹{product.price}</span>
            <span className="price-original">₹{product.price + 300}</span>
            <span className="discount">-10% OFF</span>
          </div>

          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={handleAddToCart} className="btn btn-primary btn-large">
              🛒 Add to Cart
            </button>
            <button onClick={handleWishlist} className={`btn btn-secondary btn-large ${isWishlisted ? 'wishlisted' : ''}`}>
              {isWishlisted ? '❤️' : '🤍'} Wishlist
            </button>
          </div>

          <div className="product-offers">
            <div className="offer">
              <span className="offer-icon">🚚</span>
              <div>
                <strong>Free Shipping</strong>
                <p>{product.shipping}</p>
              </div>
            </div>
            <div className="offer">
              <span className="offer-icon">↩️</span>
              <div>
                <strong>Easy Returns</strong>
                <p>{product.returns}</p>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="seller-card">
            <h4>Sold by</h4>
            <div className="seller-info">
              <div className="seller-details">
                <h5>{product.seller.name}</h5>
                <p className="seller-rating">⭐ {product.seller.rating} • {product.seller.followers} followers</p>
                <p className="seller-items">{product.seller.items}</p>
              </div>
              <button className="btn btn-outline">Contact Seller</button>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Features */}
      <div className="product-details-section">
        <div className="details-grid">
          <div className="details-column">
            <h3>Product Description</h3>
            <p>{product.description}</p>
            <p className="details-text">{product.details}</p>
          </div>
          <div className="details-column">
            <h3>Specifications</h3>
            <table className="specs-table">
              <tbody>
                {Object.entries(product.features).map(([key, value]) => (
                  <tr key={key}>
                    <td className="spec-label">{key}</td>
                    <td className="spec-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        <div className="reviews-container">
          <div className="review-item">
            <div className="reviewer-header">
              <span className="reviewer-avatar">👨</span>
              <div className="reviewer-info">
                <p className="reviewer-name">Rajesh Kumar</p>
                <span className="review-rating">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
            <p className="review-text">Excellent quality! The product arrived perfectly packaged and matches the description. Highly recommended for anyone wanting authentic tribal products.</p>
            <p className="review-meta">Verified Purchase • 2 weeks ago</p>
          </div>
          <div className="review-item">
            <div className="reviewer-header">
              <span className="reviewer-avatar">👩</span>
              <div className="reviewer-info">
                <p className="reviewer-name">Priya Singh</p>
                <span className="review-rating">⭐⭐⭐⭐</span>
              </div>
            </div>
            <p className="review-text">Great product and fast shipping. The artisan work is truly remarkable. Definitely worth the price.</p>
            <p className="review-meta">Verified Purchase • 1 month ago</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} category={product.category} products={allProducts} />
    </div>
  )
}

export default ProductPage
