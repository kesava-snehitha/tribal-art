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

  // All products data
  const allProducts = [
    {
      id: 1,
      name: 'wooden basket',
      artisan: 'Lakshmi Artisans',
      price: 1299,
      image: img1,
      rating: 5,
      reviews: 124,
      category: 'Textiles',
      isVerified: true,
      gallery: [img1, img2, img3],
      description: 'Beautiful handwoven tribal basket crafted using traditional techniques passed down through generations. Perfect for storage and decoration.',
      features: {
        'Material': 'Natural fibers',
        'Dimensions': '30cm x 25cm x 20cm',
        'Weight': '500g',
        'Handmade': 'Yes',
        'Certificate': 'Authenticity certificate included'
      },
      details: 'Each basket is unique and made with love by skilled artisans from rural communities. The weaving pattern tells a story of tribal heritage.',
      shipping: 'Free shipping on orders above ₹.500',
      returns: '30-day return policy',
      seller: { name: 'Lakshmi Artisans', followers: '2.4K', items: '156 products', verified: true, rating: 4.8 }
    },
    {
      id: 2,
      name: 'tribal pottery',
      artisan: 'Abhijit Pottery',
      price: 899,
      image: img2,
      rating: 4,
      reviews: 89,
      category: 'Pottery',
      isVerified: true,
      gallery: [img2, img3, img4],
      description: 'Authentic clay pottery handmade by traditional potters. Great for serving or display.',
      features: {
        'Material': 'Clay',
        'Type': 'Decorative bowls',
        'Size': 'Medium',
        'Handmade': 'Yes',
        'Safe': 'Food-safe & microwave-proof'
      },
      details: 'Made using age-old pottery techniques without any modern machinery.',
      shipping: 'Free shipping',
      returns: '15-day return policy',
      seller: { name: 'Abhijit Pottery', followers: '1.2K', items: '89 products', verified: true, rating: 4.5 }
    },
    {
      id: 3,
      name: 'wooden mask',
      artisan: 'Kumar Crafts',
      price: 2499,
      image: img3,
      rating: 5,
      reviews: 156,
      category: 'Sculpture',
      isVerified: true,
      gallery: [img3, img4, img1],
      description: 'Exquisitely carved tribal wooden mask. A collectors item and perfect home decor.',
      features: {
        'Material': 'Wood',
        'Carving': 'Hand-carved',
        'Size': '25cm height',
        'Origin': 'Rural tribal region',
        'Certificate': 'Authenticity certificate'
      },
      details: 'Each mask depicts unique tribal motifs and tells cultural stories.',
      shipping: 'Secure packaging included',
      returns: '7-day return policy',
      seller: { name: 'Kumar Crafts', followers: '3.1K', items: '156 products', verified: true, rating: 4.9 }
    },
    {
      id: 4,
      name: 'Beaded Necklace',
      artisan: 'Priya Jewelry',
      price: 649,
      image: img4,
      rating: 4,
      reviews: 67,
      category: 'Jewelry',
      isVerified: true,
      gallery: [img4, img1, img2],
      description: 'Beautiful handmade beaded necklace with tribal patterns.',
      features: {
        'Material': 'Beads & natural stones',
        'Length': '45cm',
        'Clasp': 'Secure hook clasp',
        'Hypoallergenic': 'Yes',
        'Package': 'Premium gift box included'
      },
      details: 'Each bead is individually selected and strung together with precision.',
      shipping: 'Express delivery available',
      returns: '30-day return policy',
      seller: { name: 'Priya Jewelry', followers: '1.8K', items: '67 products', verified: true, rating: 4.7 }
    },
    {
      id: 5,
      name: 'ceramic plates',
      artisan: 'Modern Pottery',
      price: 1899,
      image: ceramicPlateImg,
      rating: 5,
      reviews: 102,
      category: 'Pottery',
      isVerified: true,
      gallery: [ceramicPlateImg, img1, img2],
      description: 'Beautiful ceramic plates.',
      features: { 'Material': 'Ceramic', 'Type': 'Dining' },
      details: 'Hand painted.',
      shipping: 'Free shipping',
      returns: '30-day return policy',
      seller: { name: 'Modern Pottery', followers: '1.8K', items: '67 products', verified: true, rating: 4.7 }
    },
    {
      id: 6,
      name: 'tribal painting',
      artisan: 'Saraswati Artists',
      price: 2499,
      image: tribalPaintingImg,
      rating: 5,
      reviews: 80,
      category: 'Paintings',
      isVerified: true,
      gallery: [tribalPaintingImg, img2, img3],
      description: 'Colorful tribal painting.',
      features: { 'Material': 'Canvas', 'Type': 'Art' },
      details: 'Authentic canvas.',
      shipping: 'Free shipping',
      returns: '30-day return policy',
      seller: { name: 'Saraswati Artists', followers: '1.8K', items: '67 products', verified: true, rating: 4.7 }
    },
    {
      id: 7,
      name: 'wooden sculpture',
      artisan: 'Tribal Woodcrafts',
      price: 3499,
      image: woodenSculptureImg,
      rating: 5,
      reviews: 124,
      category: 'Sculpture',
      isVerified: true,
      gallery: [woodenSculptureImg, img3, img4],
      description: 'Tall hand-carved wooden sculpture.',
      features: { 'Material': 'Wood', 'Type': 'Sculpture' },
      details: 'Hand carved.',
      shipping: 'Free shipping',
      returns: '30-day return policy',
      seller: { name: 'Tribal Woodcrafts', followers: '1.8K', items: '67 products', verified: true, rating: 4.7 }
    }
  ]

  const product = allProducts.find(p => p.id === parseInt(id))

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
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
