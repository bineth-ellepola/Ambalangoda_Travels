import { Link, useParams } from 'react-router-dom'
import Icon, { WhatsAppIcon } from '../components/Icon'
import InquiryForm from '../components/InquiryForm'
import Media from '../components/Media'
import { ErrorMessage, Loader } from '../components/Status'
import useApi from '../hooks/useApi'
import usePageTitle from '../hooks/usePageTitle'
import { formatPrice, whatsappLink } from '../siteConfig'

export default function TourDetail() {
  const { id } = useParams()
  const { data: tour, loading, error, reload } = useApi(`/tours/${id}`)
  usePageTitle(tour?.title || 'Tour')

  if (loading) return <div className="container section"><Loader label="Loading tour..." /></div>

  if (error) {
    return (
      <div className="container section">
        <ErrorMessage message={error} onRetry={reload} />
        <p className="center">
          <Link to="/tours" className="link-arrow"><Icon name="back" size={18} /> Back to all tours</Link>
        </p>
      </div>
    )
  }

  return (
    <>
      <section className="tour-hero">
        <Media src={tour.image} alt={tour.title} className="tour-hero__media" />
        <div className="tour-hero__overlay">
          <div className="container">
            <Link to="/tours" className="tour-hero__back">
              <Icon name="back" size={18} /> All tours
            </Link>
            <span className="tag">{tour.category}</span>
            <h1>{tour.title}</h1>
            <div className="tour-hero__meta">
              <span><Icon name="clock" size={18} /> {tour.duration}</span>
              {tour.location && <span><Icon name="pin" size={18} /> {tour.location}</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail">
          <div className="detail__main">
            <p className="lead">{tour.summary}</p>
            {tour.description && <p className="prose">{tour.description}</p>}

            {tour.highlights?.length > 0 && (
              <>
                <h2>Highlights</h2>
                <ul className="checklist">
                  {tour.highlights.map((item) => (
                    <li key={item}><Icon name="check" size={18} /> {item}</li>
                  ))}
                </ul>
              </>
            )}

            {tour.itinerary?.length > 0 && (
              <>
                <h2>Itinerary</h2>
                <ol className="timeline">
                  {tour.itinerary.map((step) => (
                    <li key={`${step.day}-${step.title}`}>
                      <span className="timeline__day">Day {step.day}</span>
                      <h3>{step.title}</h3>
                      {step.details && <p>{step.details}</p>}
                    </li>
                  ))}
                </ol>
              </>
            )}

            {tour.includes?.length > 0 && (
              <>
                <h2>What's included</h2>
                <ul className="checklist checklist--muted">
                  {tour.includes.map((item) => (
                    <li key={item}><Icon name="check" size={18} /> {item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="detail__aside">
            <div className="booking-card">
              <div className="price price--large">
                <small>From</small>
                <strong>{formatPrice(tour.price)}</strong>
                <small>per person</small>
              </div>
              <h3>Book or ask a question</h3>
              <InquiryForm tourId={tour._id} compact />
              <a
                className="btn btn--whatsapp btn--block"
                href={whatsappLink(`Hi, I'm interested in the "${tour.title}" tour.`)}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={20} /> Ask on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
