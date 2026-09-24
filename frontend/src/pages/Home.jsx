import { Link } from 'react-router-dom'
import HeroScene from '../components/HeroScene'
import Icon from '../components/Icon'
import Media from '../components/Media'
import TourCard from '../components/TourCard'
import { ErrorMessage, Loader } from '../components/Status'
import useApi from '../hooks/useApi'
import usePageTitle from '../hooks/usePageTitle'
import { whatsappLink } from '../siteConfig'

const reasons = [
  { icon: 'compass', title: 'Local experts', text: 'Born and raised in Ambalangoda, our guides know every hidden beach and village.' },
  { icon: 'car', title: 'Comfortable vehicles', text: 'Clean, air-conditioned cars and vans with experienced, licensed drivers.' },
  { icon: 'heart', title: 'Tailor-made trips', text: 'Every tour can be adjusted to your pace, budget and interests.' },
  { icon: 'shield', title: 'Fair & transparent', text: 'Clear prices with no hidden extras. Pay when you are happy with the plan.' },
]

function FeaturedTours() {
  const { data: tours, loading, error, reload } = useApi('/tours')

  if (loading) return <Loader label="Loading tours..." />
  if (error) return <ErrorMessage message={error} onRetry={reload} />
  if (!tours.length) return <p className="muted center">New tours are coming soon.</p>

  const featured = tours.filter((tour) => tour.featured)
  const shown = (featured.length ? featured : tours).slice(0, 3)

  return (
    <div className="grid grid--3">
      {shown.map((tour) => (
        <TourCard key={tour._id} tour={tour} />
      ))}
    </div>
  )
}

function DestinationsPreview() {
  const { data: places, loading } = useApi('/discription')

  if (loading || !places?.length) return null

  return (
    <section className="section section--sand">
      <div className="container">
        <div className="section__head section__head--split">
          <div>
            <span className="eyebrow">Where we go</span>
            <h2>Destinations around Ambalangoda</h2>
          </div>
          <Link to="/destinations" className="link-arrow">
            All destinations <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="grid grid--4">
          {places.slice(0, 4).map((place) => (
            <Link to="/destinations" key={place._id} className="place-tile">
              <Media src={place.image} alt={place.title} />
              <span>{place.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryPreview() {
  const { data: photos, loading } = useApi('/photos')

  if (loading || !photos?.length) return null

  return (
    <section className="section">
      <div className="container">
        <div className="section__head section__head--split">
          <div>
            <span className="eyebrow">Moments</span>
            <h2>From our travellers' trips</h2>
          </div>
          <Link to="/gallery" className="link-arrow">
            View gallery <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="gallery-strip">
          {photos.slice(0, 6).map((photo) => (
            <Link to="/gallery" key={photo._id}>
              <Media src={photo.image} alt={photo.caption || 'Travel photo'} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  usePageTitle()

  return (
    <>
      <section className="hero">
        <HeroScene />
        <div className="container hero__content">
          <span className="eyebrow eyebrow--light">Ambalangoda · Sri Lanka</span>
          <h1>Discover the golden south coast of Sri Lanka</h1>
          <p>
            River safaris, mask-carving villages, turtle beaches and whole-island round tours, all
            guided by locals who call this coast home.
          </p>
          <div className="hero__actions">
            <Link to="/tours" className="btn btn--accent">
              Explore tours <Icon name="arrow" size={18} />
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              Plan my trip
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head section__head--split">
            <div>
              <span className="eyebrow">Popular experiences</span>
              <h2>Featured tours</h2>
            </div>
            <Link to="/tours" className="link-arrow">
              All tours <Icon name="arrow" size={18} />
            </Link>
          </div>
          <FeaturedTours />
        </div>
      </section>

      <section className="section section--ocean">
        <div className="container">
          <div className="section__head center">
            <span className="eyebrow eyebrow--light">Why travel with us</span>
            <h2>Your trip, in local hands</h2>
          </div>
          <div className="grid grid--4">
            {reasons.map((reason) => (
              <div className="feature" key={reason.title}>
                <span className="feature__icon">
                  <Icon name={reason.icon} size={26} />
                </span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DestinationsPreview />
      <GalleryPreview />

      <section className="section">
        <div className="container">
          <div className="cta">
            <div>
              <h2>Ready to plan your Sri Lanka adventure?</h2>
              <p>Tell us your dates and interests, and we will put together a trip just for you.</p>
            </div>
            <div className="cta__actions">
              <Link to="/contact" className="btn btn--accent">Send an inquiry</Link>
              <a className="btn btn--ghost" href={whatsappLink()} target="_blank" rel="noreferrer">
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
