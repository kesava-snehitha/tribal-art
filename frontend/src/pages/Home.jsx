import { Link } from 'react-router-dom'
import imghero from '../assets/hero.jpg'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.webp'
import img3 from '../assets/3.webp'
import img4 from '../assets/4.webp'
import ceramicPlateImg from '../assets/ceramic-plate.png'
import tribalPaintingImg from '../assets/tribal-painting.png'
import woodenSculptureImg from '../assets/wooden-sculpture.png'
import './Home.css'

function Home({ isLoggedIn, userRole }) {
  const featuredProducts = [
    {
      id: 1,
      name: 'Wooden Basket',
      artisan: 'Lakshmi Artisans',
      price: 1299,
      image: img1,
      rating: 5,
      reviews: 124,
      category: 'Textiles',
      isVerified: true
    },
    {
      id: 2,
      name: 'Tribal Pottery',
      artisan: 'Abhijit Pottery',
      price: 899,
      image: img2,
      rating: 4,
      reviews: 89,
      category: 'Pottery',
      isVerified: true
    },
    {
      id: 3,
      name: 'Wooden Mask',
      artisan: 'Kumar Crafts',
      price: 2499,
      image: img3,
      rating: 5,
      reviews: 156,
      category: 'Sculpture',
      isVerified: true
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
      isVerified: true
    },
    {
      id: 5,
      name: 'Ceramic Plates',
      artisan: 'Modern Pottery',
      price: 1899,
      image: ceramicPlateImg,
      rating: 5,
      reviews: 102,
      category: 'Pottery',
      isVerified: true
    },
    {
      id: 6,
      name: 'Tribal Painting',
      artisan: 'Saraswati Artists',
      price: 2499,
      image: tribalPaintingImg,
      rating: 5,
      reviews: 80,
      category: 'Paintings',
      isVerified: true
    },
    {
      id: 7,
      name: 'Wooden Sculpture',
      artisan: 'Tribal Woodcrafts',
      price: 3499,
      image: woodenSculptureImg,
      rating: 5,
      reviews: 124,
      category: 'Sculpture',
      isVerified: true
    }
  ]

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      text: 'Amazing quality and authentic tribal products. Highly recommend!',
      avatar: '👨'
    },
    {
      name: 'Priya Singh',
      text: 'Best platform to buy authentic handmade products. Love the community!',
      avatar: '👩'
    },
    {
      name: 'Vikram Patel',
      text: 'Supporting artisans has never been easier. Great experience!',
      avatar: '👨'
    }
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>🎨 TribalArt: Celebrate Cultural Heritage</h1>
          <p>Connect with talented tribal artisans. Buy authentic, handmade products that preserve centuries-old traditions.</p>
          <div className="hero-buttons">
            {(!isLoggedIn || userRole === 'customer') && (
              <Link to={isLoggedIn ? "/products" : "/login"} className="btn btn-primary btn-large">
                Shop Now
              </Link>
            )}
            {!isLoggedIn && (
              <Link to="/signup" className="btn btn-secondary btn-large">
                Artisan
              </Link>
            )}
          </div>
        </div>
        <div className="hero-image">
          <img src={imghero} alt="Hero" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why TribalArt?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">✅</span>
            <h3>Verified Authentic</h3>
            <p>All products verified by cultural consultants for authenticity</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👥</span>
            <h3>Direct Support</h3>
            <p>100% of proceeds go directly to artisans</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🌍</span>
            <h3>Global Reach</h3>
            <p>Connect with customers worldwide</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💬</span>
            <h3>Community Chat</h3>
            <p>Direct communication between artisans and buyers</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="home-product-card">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} />
                {product.isVerified && <span className="badge badge-success">✓ Verified</span>}
              </div>
              <div className="product-details">
                <h4>{product.name}</h4>
                <p className="artisan-name">by {product.artisan}</p>
                <div className="product-meta">
                  <span className="rating">⭐ {product.rating} ({product.reviews})</span>
                  <span className="price">₹{product.price}</span>
                </div>
                <Link to={isLoggedIn ? `/product/${product.id}` : "/login"} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          <Link to={isLoggedIn ? "/products" : "/login"} className="category-card textiles">
            <span className="cat-emoji">🧵</span>
            <h3>Textiles</h3>
          </Link>
          <Link to={isLoggedIn ? "/products" : "/login"} className="category-card jewelry">
            <span className="cat-emoji">💎</span>
            <h3>Jewelry</h3>
          </Link>
          <Link to={isLoggedIn ? "/products" : "/login"} className="category-card pottery">
            <span className="cat-emoji">🏺</span>
            <h3>Pottery</h3>
          </Link>
          <Link to={isLoggedIn ? "/products" : "/login"} className="category-card sculpture">
            <span className="cat-emoji">🗿</span>
            <h3>Sculpture</h3>
          </Link>
          <Link to={isLoggedIn ? "/products" : "/login"} className="category-card painting">
            <span className="cat-emoji">🎨</span>
            <h3>Paintings</h3>
          </Link>
          <Link to={isLoggedIn ? "/products" : "/login"} className="category-card woodcraft">
            <span className="cat-emoji">🪵</span>
            <h3>Woodcraft</h3>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="section-title">What Our Community Says</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <span className="author-avatar">{testimonial.avatar}</span>
                <p className="author-name">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Support Tribal Artisans?</h2>
        <p>Join thousands of customers preserving cultural heritage</p>
        {(!isLoggedIn || userRole === 'customer') && (
          <Link to={isLoggedIn ? "/products" : "/login"} className="btn btn-primary btn-large">
            Start Shopping Today
          </Link>
        )}
      </section>
    </div>
  )
}

export default Home
