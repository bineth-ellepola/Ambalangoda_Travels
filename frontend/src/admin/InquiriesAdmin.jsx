import { useState } from 'react'
import { api } from '../api'
import Icon from '../components/Icon'
import { Empty, ErrorMessage, Loader } from '../components/Status'
import useApi from '../hooks/useApi'

const filters = ['all', 'new', 'contacted', 'closed']

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '-'

export default function InquiriesAdmin() {
  const [filter, setFilter] = useState('all')
  const { data: inquiries, loading, error, reload } = useApi('/inquiries', { auth: true })
  const [actionError, setActionError] = useState('')

  const run = async (action) => {
    setActionError('')
    try {
      await action()
      reload()
    } catch (err) {
      setActionError(err.message)
    }
  }

  const setStatus = (inquiry, status) => run(() => api.patch(`/inquiries/${inquiry._id}`, { status }, { auth: true }))

  const remove = (inquiry) => {
    if (!window.confirm(`Delete the inquiry from ${inquiry.name}?`)) return
    run(() => api.del(`/inquiries/${inquiry._id}`, { auth: true }))
  }

  const shown = inquiries?.filter((item) => filter === 'all' || item.status === filter) || []
  const newCount = inquiries?.filter((item) => item.status === 'new').length || 0

  return (
    <>
      <div className="admin__header">
        <div>
          <h1>Inquiries</h1>
          <p className="muted">{newCount} new {newCount === 1 ? 'inquiry' : 'inquiries'}</p>
        </div>
      </div>

      <div className="chips">
        {filters.map((item) => (
          <button key={item} className={`chip ${filter === item ? 'is-active' : ''}`} onClick={() => setFilter(item)}>
            {item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {actionError && <ErrorMessage message={actionError} />}
      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={reload} />}
      {inquiries && !shown.length && <Empty>No inquiries here.</Empty>}

      <div className="inquiry-list">
        {shown.map((inquiry) => (
          <article key={inquiry._id} className={`card inquiry inquiry--${inquiry.status}`}>
            <header className="inquiry__head">
              <div>
                <h3>{inquiry.name}</h3>
                <small className="muted">Received {formatDate(inquiry.createdAt)}</small>
              </div>
              <select
                value={inquiry.status}
                onChange={(event) => setStatus(inquiry, event.target.value)}
                aria-label="Inquiry status"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </header>
            <dl className="inquiry__facts">
              <div><dt>Tour</dt><dd>{inquiry.tourTitle || 'Custom / not specified'}</dd></div>
              <div><dt>Travel date</dt><dd>{formatDate(inquiry.travelDate)}</dd></div>
              <div><dt>Guests</dt><dd>{inquiry.guests}</dd></div>
            </dl>
            <p className="inquiry__message">{inquiry.message}</p>
            <footer className="inquiry__actions">
              <a className="btn btn--outline btn--sm" href={`mailto:${inquiry.email}`}>
                <Icon name="mail" size={16} /> {inquiry.email}
              </a>
              {inquiry.phone && (
                <a className="btn btn--outline btn--sm" href={`tel:${inquiry.phone}`}>
                  <Icon name="phone" size={16} /> {inquiry.phone}
                </a>
              )}
              <button className="btn btn--danger btn--sm" onClick={() => remove(inquiry)}>
                <Icon name="trash" size={16} /> Delete
              </button>
            </footer>
          </article>
        ))}
      </div>
    </>
  )
}
