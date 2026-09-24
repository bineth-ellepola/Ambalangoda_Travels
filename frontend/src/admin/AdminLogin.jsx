import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Logo } from '../components/Layout'
import useAuth from '../hooks/useAuth'
import usePageTitle from '../hooks/usePageTitle'

export default function AdminLogin() {
  usePageTitle('Admin login')
  const { isAdmin, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (isAdmin) return <Navigate to="/admin" replace />

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await login(form.username, form.password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <div className="login">
      <form className="card login__card form" onSubmit={submit}>
        <Logo />
        <h1>Admin login</h1>
        <label>
          Username
          <input name="username" value={form.username} onChange={update} required autoComplete="username" />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={update}
            required
            autoComplete="current-password"
          />
        </label>
        {error && <p className="form__error" role="alert">{error}</p>}
        <button className="btn btn--accent btn--block" disabled={busy}>
          {busy ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
