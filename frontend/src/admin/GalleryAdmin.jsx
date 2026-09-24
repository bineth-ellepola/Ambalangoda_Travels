import { useRef, useState } from 'react'
import { api } from '../api'
import Icon from '../components/Icon'
import { Empty, ErrorMessage, Loader } from '../components/Status'
import useApi from '../hooks/useApi'

export default function GalleryAdmin() {
  const { data: photos, loading, error, reload } = useApi('/photos')
  const [files, setFiles] = useState([])
  const [caption, setCaption] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const fileInput = useRef(null)

  const upload = async (event) => {
    event.preventDefault()
    if (!files.length) return

    setBusy(true)
    setMessage({ type: '', text: '' })

    const body = new FormData()
    files.forEach((file) => body.append('images', file))
    body.append('caption', caption)

    try {
      const result = await api.post('/photos', body, { auth: true })
      setMessage({ type: 'success', text: `${result.data.length} photo(s) uploaded.` })
      setFiles([])
      setCaption('')
      if (fileInput.current) fileInput.current.value = ''
      reload()
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  const remove = async (photo) => {
    if (!window.confirm('Delete this photo?')) return
    try {
      await api.del(`/photos/${photo._id}`, { auth: true })
      reload()
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    }
  }

  return (
    <>
      <div className="admin__header">
        <h1>Gallery</h1>
      </div>

      <form className="card form upload-box" onSubmit={upload}>
        <label>
          Choose photos (up to 20 at once)
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(event) => setFiles(Array.from(event.target.files).slice(0, 20))}
          />
        </label>
        <label>
          Caption <small className="muted">(optional, applied to all selected photos)</small>
          <input value={caption} onChange={(event) => setCaption(event.target.value)} />
        </label>
        <button className="btn btn--accent" disabled={busy || !files.length}>
          <Icon name="upload" size={18} />
          {busy ? 'Uploading...' : `Upload ${files.length || ''} photo${files.length === 1 ? '' : 's'}`}
        </button>
        {message.text && (
          <p className={message.type === 'error' ? 'form__error' : 'form__success'} role="status">
            {message.text}
          </p>
        )}
      </form>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={reload} />}
      {photos && !photos.length && <Empty>No photos uploaded yet.</Empty>}

      <div className="admin-gallery">
        {photos?.map((photo) => (
          <figure key={photo._id}>
            <img src={photo.image} alt={photo.caption || 'Gallery photo'} loading="lazy" />
            {photo.caption && <figcaption>{photo.caption}</figcaption>}
            <button className="icon-btn icon-btn--danger" onClick={() => remove(photo)} aria-label="Delete photo">
              <Icon name="trash" size={18} />
            </button>
          </figure>
        ))}
      </div>
    </>
  )
}
