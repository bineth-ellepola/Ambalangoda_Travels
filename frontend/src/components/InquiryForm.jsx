import { useState } from 'react'
import { api } from '../api'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  travelDate: '',
  guests: 2,
  message: '',
}

const today = () => new Date().toISOString().slice(0, 10)

export default function InquiryForm({ tours = [], tourId = '', compact = false }) {
  const [form, setForm] = useState({ ...emptyForm, tour: tourId })
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const update = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setStatus({ state: 'sending', message: '' })

    try {
      const result = await api.post('/inquiries', form)
      setStatus({ state: 'sent', message: result.message })
      setForm({ ...emptyForm, tour: tourId })
    } catch (error) {
      setStatus({ state: 'error', message: error.message })
    }
  }

  if (status.state === 'sent') {
    return (
      <div className="form-success" role="status">
        <h3>Inquiry sent!</h3>
        <p>{status.message}</p>
        <button className="btn btn--outline btn--sm" onClick={() => setStatus({ state: 'idle', message: '' })}>
          Send another inquiry
        </button>
      </div>
    )
  }

  return (
    <form className={`form ${compact ? 'form--compact' : ''}`} onSubmit={submit}>
      <div className="form__row">
        <label>
          Full name *
          <input name="name" value={form.name} onChange={update} required autoComplete="name" />
        </label>
        <label>
          Email *
          <input type="email" name="email" value={form.email} onChange={update} required autoComplete="email" />
        </label>
      </div>

      <div className="form__row">
        <label>
          Phone / WhatsApp
          <input type="tel" name="phone" value={form.phone} onChange={update} autoComplete="tel" />
        </label>
        {!tourId && (
          <label>
            Tour
            <select name="tour" value={form.tour} onChange={update}>
              <option value="">Not sure yet / custom trip</option>
              {tours.map((tour) => (
                <option key={tour._id} value={tour._id}>
                  {tour.title}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="form__row">
        <label>
          Travel date
          <input type="date" name="travelDate" value={form.travelDate} min={today()} onChange={update} />
        </label>
        <label>
          Guests
          <input type="number" name="guests" min="1" max="50" value={form.guests} onChange={update} />
        </label>
      </div>

      <label>
        Message *
        <textarea
          name="message"
          rows={compact ? 3 : 5}
          value={form.message}
          onChange={update}
          required
          placeholder="Tell us about your plans, pick-up location or any questions."
        />
      </label>

      {status.state === 'error' && (
        <p className="form__error" role="alert">
          {status.message}
        </p>
      )}

      <button className="btn btn--accent btn--block" disabled={status.state === 'sending'}>
        {status.state === 'sending' ? 'Sending...' : 'Send inquiry'}
      </button>
    </form>
  )
}
