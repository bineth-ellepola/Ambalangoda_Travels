import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import TourCard from '../components/TourCard'
import { Empty, ErrorMessage, Loader } from '../components/Status'
import useApi from '../hooks/useApi'
import usePageTitle from '../hooks/usePageTitle'

const categories = ['All', 'Day Tour', 'Excursion', 'Round Tour', 'Transfer']

export default function Tours() {
  usePageTitle('Tours')
  const [category, setCategory] = useState('All')
  const { data: tours, loading, error, reload } = useApi('/tours')

  const shown = tours?.filter((tour) => category === 'All' || tour.category === category) || []

  return (
    <>
      <PageHeader eyebrow="Tours & experiences" title="Find your next adventure">
        From half-day river safaris to week-long journeys across the island.
      </PageHeader>

      <section className="section">
        <div className="container">
          <div className="chips" role="tablist" aria-label="Filter tours by type">
            {categories.map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={category === item}
                className={`chip ${category === item ? 'is-active' : ''}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {loading && <Loader label="Loading tours..." />}
          {error && <ErrorMessage message={error} onRetry={reload} />}
          {tours && !shown.length && <Empty>No tours in this category yet. Contact us for a custom trip!</Empty>}

          <div className="grid grid--3">
            {shown.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
