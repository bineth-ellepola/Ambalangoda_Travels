import { useState } from 'react'
import { api } from '../api'
import Icon from '../components/Icon'
import Media from '../components/Media'
import { Empty, ErrorMessage, Loader } from '../components/Status'
import useApi from '../hooks/useApi'
import ImageInput from './ImageInput'

function DestinationForm({ place, onSaved, onCancel }) {
  const [form, setForm] = useState({ title: place?.title || '', description: place?.description || '' })
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')

    const body = new FormData()
    body.append('title', form.title)
    body.append('description', form.description)
    if (image) body.append('image', image)

    try {
      if (place) await api.put(`/discription/${place._id}`, body, { auth: true })
      else await api.post('/discription/add', body, { auth: true })
      onSaved()
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <form className="card form admin-form" onSubmit={submit}>
      <h2>{place ? `Edit "${place.title}"` : 'Add a destination'}</h2>
      <ImageInput current={place?.image} onChange={setImage} />
      <label>
        Name *
        <input name="title" value={form.title} onChange={update} required />
      </label>
      <label>
        Description *
        <textarea name="description" rows="4" value={form.description} onChange={update} required />
      </label>
      {error && <p className="form__error" role="alert">{error}</p>}
      <div className="admin-form__actions">
        <button type="button" className="btn btn--outline" onClick={onCancel} disabled={busy}>Cancel</button>
        <button className="btn btn--accent" disabled={busy}>{busy ? 'Saving...' : 'Save destination'}</button>
      </div>
    </form>
  )
}

export default function DestinationsAdmin() {
  const { data: places, loading, error, reload } = useApi('/discription')
  const [editing, setEditing] = useState(null)
  const [actionError, setActionError] = useState('')

  const saved = () => {
    setEditing(null)
    reload()
  }

  const remove = async (place) => {
    if (!window.confirm(`Delete "${place.title}"?`)) return
    setActionError('')
    try {
      await api.del(`/discription/${place._id}`, { auth: true })
      reload()
    } catch (err) {
      setActionError(err.message)
    }
  }

  if (editing) {
    return (
      <DestinationForm place={editing === 'new' ? null : editing} onSaved={saved} onCancel={() => setEditing(null)} />
    )
  }

  return (
    <>
      <div className="admin__header">
        <h1>Destinations</h1>
        <button className="btn btn--accent" onClick={() => setEditing('new')}>
          <Icon name="plus" size={18} /> Add destination
        </button>
      </div>

      {actionError && <ErrorMessage message={actionError} />}
      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={reload} />}
      {places && !places.length && <Empty>No destinations yet.</Empty>}

      <div className="admin-list">
        {places?.map((place) => (
          <div className="card admin-row" key={place._id}>
            <Media src={place.image} alt={place.title} className="admin-row__thumb" />
            <div className="admin-row__info">
              <h3>{place.title}</h3>
              <small className="muted clamp">{place.description}</small>
            </div>
            <div className="admin-row__actions">
              <button className="icon-btn" onClick={() => setEditing(place)} aria-label={`Edit ${place.title}`}>
                <Icon name="edit" size={18} />
              </button>
              <button className="icon-btn icon-btn--danger" onClick={() => remove(place)} aria-label={`Delete ${place.title}`}>
                <Icon name="trash" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
