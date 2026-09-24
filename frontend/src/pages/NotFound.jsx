import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')

  return (
    <section className="section">
      <div className="container center not-found">
        <span className="eyebrow">404</span>
        <h1>This path leads out to sea</h1>
        <p className="muted">The page you are looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn btn--accent">Back to home</Link>
      </div>
    </section>
  )
}
