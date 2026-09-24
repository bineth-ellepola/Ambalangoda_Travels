import { useState } from 'react'
import { api } from '../api'
import Icon from '../components/Icon'
import Media from '../components/Media'
import { Empty, ErrorMessage, Loader } from '../components/Status'
import useApi from '../hooks/useApi'
import { formatPrice } from '../siteConfig'
import ImageInput from './ImageInput'

const categories = ['Day Tour', 'Excursion', 'Round Tour', 'Transfer']

const toForm = (tour) => ({
  title: tour?.title || '',
  category: tour?.category || 'Day Tour',
  duration: tour?.duration || '',
  price: tour?.price ?? '',
  location: tour?.location || '',
  summary: tour?.summary || '',
  description: tour?.description || '',
  highlights: (tour?.highlights || []).join('\n'),
  includes: (tour?.includes || []).join('\n'),
  itinerary: tour?.itinerary?.length ? tour.itinerary : [],
  featured: tour?.featured || false,
})

function TourForm({ tour, onSaved, onCancel }) {
  const [form, setForm] = useState(() => toForm(tour))
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const update = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const updateDay = (index, field, value) =>
    setForm((current) => ({
      ...current,
      itinerary: current.itinerary.map((day, i) => (i === index ? { ...day, [field]: value } : day)),
    }))

  const addDay = () =>
    setForm((current) => ({
      ...current,
      itinerary: [...current.itinerary, { day: current.itinerary.length + 1, title: '', details: '' }],
    }))

  const removeDay = (index) =>
    setForm((current) => ({
      ...current,
      itinerary: current.itinerary
        .filter((_, i) => i !== index)
        .map((day, i) => ({ ...day, day: i + 1 })),
    }))

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')

    const body = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      body.append(key, key === 'itinerary' ? JSON.stringify(value) : value)
    })
    if (image) body.append('image', image)

    try {
      if (tour) await api.put(`/tours/${tour._id}`, body, { auth: true })
      else await api.post('/tours', body, { auth: true })
      onSaved()
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <form className="card form admin-form" onSubmit={submit}>
      <h2>{tour ? `Edit "${tour.title}"` : 'Add a new tour'}</h2>

      <ImageInput current={tour?.image} onChange={setImage} label="Cover image" />

      <label>
        Title *
        <input name="title" value={form.title} onChange={update} required />
      </label>

      <div className="form__row form__row--3">
        <label>
          Category
          <select name="category" value={form.category} onChange={update}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Duration *
          <input name="duration" value={form.duration} onChange={update} placeholder="e.g. 1 Day" required />
        </label>
        <label>
          Price (USD) *
          <input type="number" name="price" min="0" value={form.price} onChange={update} required />
        </label>
      </div>

      <label>
        Location
        <input name="location" value={form.location} onChange={update} placeholder="e.g. Galle" />
      </label>

      <label>
        Short summary *
        <textarea name="summary" rows="2" value={form.summary} onChange={update} required />
      </label>

      <label>
        Full description
        <textarea name="description" rows="5" value={form.description} onChange={update} />
      </label>

      <div className="form__row">
        <label>
          Highlights <small className="muted">(one per line)</small>
          <textarea name="highlights" rows="4" value={form.highlights} onChange={update} />
        </label>
        <label>
          What's included <small className="muted">(one per line)</small>
          <textarea name="includes" rows="4" value={form.includes} onChange={update} />
        </label>
      </div>

      <fieldset className="itinerary-editor">
        <legend>Itinerary</legend>
        {form.itinerary.map((day, index) => (
          <div className="itinerary-editor__row" key={index}>
            <span className="timeline__day">Day {day.day}</span>
            <input
              value={day.title}
              onChange={(event) => updateDay(index, 'title', event.target.value)}
              placeholder="Title"
              aria-label={`Day ${day.day} title`}
              required
            />
            <input
              value={day.details}
              onChange={(event) => updateDay(index, 'details', event.target.value)}
              placeholder="Details (optional)"
              aria-label={`Day ${day.day} details`}
            />
            <button type="button" className="icon-btn" onClick={() => removeDay(index)} aria-label={`Remove day ${day.day}`}>
              <Icon name="trash" size={18} />
            </button>
          </div>
        ))}
        <button type="button" className="btn btn--outline btn--sm" onClick={addDay}>
          <Icon name="plus" size={16} /> Add day
        </button>
      </fieldset>

      <label className="checkbox">
        <input type="checkbox" name="featured" checked={form.featured} onChange={update} />
        Feature this tour on the home page
      </label>

      {error && <p className="form__error" role="alert">{error}</p>}

      <div className="admin-form__actions">
        <button type="button" className="btn btn--outline" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button className="btn btn--accent" disabled={busy}>
          {busy ? 'Saving...' : 'Save tour'}
        </button>
      </div>
    </form>
  )
}

export default function ToursAdmin() {
  const { data: tours, loading, error, reload } = useApi('/tours')
  // null = list view, 'new' = create form, otherwise the tour being edited
  const [editing, setEditing] = useState(null)
  const [actionError, setActionError] = useState('')

  const saved = () => {
    setEditing(null)
    reload()
  }

  const remove = async (tour) => {
    if (!window.confirm(`Delete "${tour.title}"? This cannot be undone.`)) return
    setActionError('')
    try {
      await api.del(`/tours/${tour._id}`, { auth: true })
      reload()
    } catch (err) {
      setActionError(err.message)
    }
  }

  if (editing) {
    return <TourForm tour={editing === 'new' ? null : editing} onSaved={saved} onCancel={() => setEditing(null)} />
  }

  return (
    <>
      <div className="admin__header">
        <h1>Tours</h1>
        <button className="btn btn--accent" onClick={() => setEditing('new')}>
          <Icon name="plus" size={18} /> Add tour
        </button>
      </div>

      {actionError && <ErrorMessage message={actionError} />}
      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={reload} />}
      {tours && !tours.length && <Empty>No tours yet. Add your first one!</Empty>}

      <div className="admin-list">
        {tours?.map((tour) => (
          <div className="card admin-row" key={tour._id}>
            <Media src={tour.image} alt={tour.title} className="admin-row__thumb" />
            <div className="admin-row__info">
              <h3>
                {tour.title} {tour.featured && <span className="tag tag--small">Featured</span>}
              </h3>
              <small className="muted">
                {tour.category} · {tour.duration} · {formatPrice(tour.price)}
              </small>
            </div>
            <div className="admin-row__actions">
              <button className="icon-btn" onClick={() => setEditing(tour)} aria-label={`Edit ${tour.title}`}>
                <Icon name="edit" size={18} />
              </button>
              <button className="icon-btn icon-btn--danger" onClick={() => remove(tour)} aria-label={`Delete ${tour.title}`}>
                <Icon name="trash" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
