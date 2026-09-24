import { Link } from 'react-router-dom'
import Icon from './Icon'
import Media from './Media'
import { formatPrice } from '../siteConfig'

export default function TourCard({ tour }) {
  return (
    <article className="card tour-card">
      <Link to={`/tours/${tour._id}`} className="tour-card__media">
        <Media src={tour.image} alt={tour.title} />
        <span className="tag">{tour.category}</span>
      </Link>
      <div className="tour-card__body">
        <div className="tour-card__meta">
          <span><Icon name="clock" size={16} /> {tour.duration}</span>
          {tour.location && <span><Icon name="pin" size={16} /> {tour.location}</span>}
        </div>
        <h3>
          <Link to={`/tours/${tour._id}`}>{tour.title}</Link>
        </h3>
        <p>{tour.summary}</p>
        <div className="tour-card__footer">
          <div className="price">
            <small>From</small>
            <strong>{formatPrice(tour.price)}</strong>
          </div>
          <Link to={`/tours/${tour._id}`} className="btn btn--outline btn--sm">
            View details <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </article>
  )
}
