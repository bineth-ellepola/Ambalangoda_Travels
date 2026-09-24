import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Media from '../components/Media'
import PageHeader from '../components/PageHeader'
import { Empty, ErrorMessage, Loader } from '../components/Status'
import useApi from '../hooks/useApi'
import usePageTitle from '../hooks/usePageTitle'

export default function Destinations() {
  usePageTitle('Destinations')
  const { data: places, loading, error, reload } = useApi('/discription')

  return (
    <>
      <PageHeader eyebrow="Destinations" title="Places we love to show you">
        Beaches, rivers, forts and villages, all within easy reach of Ambalangoda.
      </PageHeader>

      <section className="section">
        <div className="container">
          {loading && <Loader label="Loading destinations..." />}
          {error && <ErrorMessage message={error} onRetry={reload} />}
          {places && !places.length && <Empty>Destinations will be added soon.</Empty>}

          <div className="grid grid--3">
            {places?.map((place) => (
              <article className="card destination-card" key={place._id}>
                <Media src={place.image} alt={place.title} />
                <div className="destination-card__body">
                  <h3>{place.title}</h3>
                  <p>{place.description}</p>
                </div>
              </article>
            ))}
          </div>

          {places?.length > 0 && (
            <p className="center section__foot">
              <Link to="/contact" className="btn btn--accent">
                Plan a trip to these places <Icon name="arrow" size={18} />
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  )
}
