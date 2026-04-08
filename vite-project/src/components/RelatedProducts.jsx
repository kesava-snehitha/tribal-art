import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import './RelatedProducts.css'

function RelatedProducts({ currentProductId, category, products }) {
  const relatedProducts = products
    .filter(p => p.id !== currentProductId && p.category === category)
    .slice(0, 4)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="related-products">
      <h3>Customers Also Bought</h3>
      <div className="related-products-grid">
        {relatedProducts.map(product => (
          <div key={product.id} className="related-product-item">
            <div className="product-image-small">
              <img src={product.image} alt={product.name} />
              {product.isVerified && <span className="badge-small">✓</span>}
            </div>
            <h4>{product.name}</h4>
            <p className="artisan-small">by {product.artisan}</p>
            <div className="price-rating-small">
              <span className="rating-small">⭐ {product.rating}</span>
              <span className="price-small">₹{product.price}</span>
            </div>
            <Link to={`/product/${product.id}`} className="btn btn-sm btn-secondary">
              View
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
