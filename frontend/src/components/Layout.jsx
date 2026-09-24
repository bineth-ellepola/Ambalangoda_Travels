import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Icon, { WhatsAppIcon } from './Icon'
import { site, whatsappLink } from '../siteConfig'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/tours', label: 'Tours' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const YEAR = new Date().getFullYear()

export function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`}>
      <img src="/favicon.svg" alt="" width="36" height="36" />
      <span>
        Ambalangoda <em>Travels</em>
      </span>
    </Link>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Logo />
        <button
          className="navbar__toggle"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>
        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} onClick={close}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn--accent btn--sm" onClick={close}>
            Book now
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p className="footer__text">
            Local guides and drivers from Ambalangoda, showing travellers the best of Sri Lanka since day one.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            {navItems.slice(1).map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li>
              <Icon name="pin" size={18} /> {site.address}
            </li>
            <li>
              <Icon name="phone" size={18} /> <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            </li>
            <li>
              <Icon name="mail" size={18} /> <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Follow us</h4>
          <ul>
            <li><a href={site.social.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href={site.social.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href={site.social.tripadvisor} target="_blank" rel="noreferrer">Tripadvisor</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {YEAR} {site.name}. All rights reserved.</span>
        <Link to="/admin">Admin</Link>
      </div>
    </footer>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <a
        className="whatsapp-fab"
        href={whatsappLink(`Hi ${site.name}, I would like to plan a trip.`)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </a>
    </>
  )
}
