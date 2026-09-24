import { Link, NavLink, Navigate, Outlet } from 'react-router-dom'
import Icon from '../components/Icon'
import { Logo } from '../components/Layout'
import useAuth from '../hooks/useAuth'
import usePageTitle from '../hooks/usePageTitle'

const sections = [
  { to: '/admin', label: 'Inquiries', icon: 'mail', end: true },
  { to: '/admin/tours', label: 'Tours', icon: 'compass' },
  { to: '/admin/destinations', label: 'Destinations', icon: 'pin' },
  { to: '/admin/gallery', label: 'Gallery', icon: 'image' },
]

export default function AdminDashboard() {
  usePageTitle('Admin')
  const { isAdmin, logout } = useAuth()

  if (!isAdmin) return <Navigate to="/admin/login" replace />

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <Logo light />
        <nav>
          {sections.map((section) => (
            <NavLink key={section.to} to={section.to} end={section.end}>
              <Icon name={section.icon} size={18} /> {section.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin__sidebar-foot">
          <Link to="/">View website</Link>
          <button onClick={logout}>
            <Icon name="logout" size={18} /> Log out
          </button>
        </div>
      </aside>
      <div className="admin__main">
        <Outlet />
      </div>
    </div>
  )
}
