import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.webp'
import img3 from '../assets/3.webp'
import img4 from '../assets/4.webp'
import ceramicPlateImg from '../assets/ceramic-plate.png'
import tribalPaintingImg from '../assets/tribal-painting.png'
import woodenSculptureImg from '../assets/wooden-sculpture.png'
import './ProductListing.css'

function ProductListing({ cartItems, setCartItems }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState([0, 5000])

  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch products:", err)
        setLoading(false)
      })
  }, [])

  const categories = ['all', 'Textiles', 'Jewelry', 'Pottery', 'Sculpture', 'Paintings']

  const filteredProducts = allProducts
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="section-title">🛍️ Shop Products</h1>
      </div>

      <div className="products-container">
        {/* Sidebar */}
        <aside className="products-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-options">
              {categories.map(cat => (
                <label key={cat} className={`filter-label ${selectedCategory === cat ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-input">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                min="0"
                max="5000"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                min="0"
                max="5000"
              />
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="price-range"
            />
          </div>

          <div className="filter-section">
            <h3>Verified Products</h3>
            <label className="filter-label">
              <input type="checkbox" defaultChecked />
              <span>Show only verified</span>
            </label>
          </div>
        </aside>

        {/* Main Content */}
        <main className="products-main">
          <div className="products-toolbar">
            <div className="result-count">
              Showing {sortedProducts.length} products
            </div>
            <div className="sort-options">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="products-grid">
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try adjusting your filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default ProductListing
