import './ReviewCard.css'

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="reviewer-avatar">{review.reviewer.charAt(0)}</div>
          <div>
            <p className="reviewer-name">{review.reviewer}</p>
            <p className="review-date">{review.date}</p>
          </div>
        </div>
        <div className="review-rating">
          {'⭐'.repeat(review.rating)}
        </div>
      </div>

      <h4 className="review-title">{review.title}</h4>
      <p className="review-text">{review.text}</p>

      {review.verified && (
        <div className="verified-purchase">✓ Verified Purchase</div>
      )}

      <div className="review-helpful">
        <button className="helpful-btn">👍 Helpful ({review.helpful})</button>
        <button className="helpful-btn">👎 Not Helpful ({review.notHelpful})</button>
      </div>
    </div>
  )
}

export default ReviewCard
