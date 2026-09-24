import { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'
import { Empty, ErrorMessage, Loader } from '../components/Status'
import useApi from '../hooks/useApi'
import usePageTitle from '../hooks/usePageTitle'

function Lightbox({ photos, index, onClose, onMove }) {
  const photo = photos[index]

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onMove(1)
      if (event.key === 'ArrowLeft') onMove(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onMove])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        <Icon name="close" size={28} />
      </button>
      {photos.length > 1 && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={(event) => { event.stopPropagation(); onMove(-1) }}
          aria-label="Previous photo"
        >
          <Icon name="chevronLeft" size={32} />
        </button>
      )}
      <figure onClick={(event) => event.stopPropagation()}>
        <img src={photo.image} alt={photo.caption || 'Travel photo'} />
        {photo.caption && <figcaption>{photo.caption}</figcaption>}
      </figure>
      {photos.length > 1 && (
        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={(event) => { event.stopPropagation(); onMove(1) }}
          aria-label="Next photo"
        >
          <Icon name="chevronRight" size={32} />
        </button>
      )}
    </div>
  )
}

export default function Gallery() {
  usePageTitle('Gallery')
  const { data: photos, loading, error, reload } = useApi('/photos')
  const [openIndex, setOpenIndex] = useState(null)

  const close = () => setOpenIndex(null)
  const move = (step) =>
    setOpenIndex((current) => (current + step + photos.length) % photos.length)

  return (
    <>
      <PageHeader eyebrow="Gallery" title="Snapshots from the south coast">
        Moments captured on our tours: rivers, reefs, wildlife and smiling travellers.
      </PageHeader>

      <section className="section">
        <div className="container">
          {loading && <Loader label="Loading photos..." />}
          {error && <ErrorMessage message={error} onRetry={reload} />}
          {photos && !photos.length && <Empty>Photos will be added soon.</Empty>}

          <div className="masonry">
            {photos?.map((photo, index) => (
              <button key={photo._id} className="masonry__item" onClick={() => setOpenIndex(index)}>
                <img src={photo.image} alt={photo.caption || 'Travel photo'} loading="lazy" />
                {photo.caption && <span>{photo.caption}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {openIndex !== null && photos?.[openIndex] && (
        <Lightbox photos={photos} index={openIndex} onClose={close} onMove={move} />
      )}
    </>
  )
}
