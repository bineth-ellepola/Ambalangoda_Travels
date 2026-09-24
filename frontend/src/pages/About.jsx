import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'
import usePageTitle from '../hooks/usePageTitle'

const values = [
  { icon: 'users', title: 'Community first', text: 'We work with local boatmen, carvers, cooks and guesthouses so your trip supports the people who live here.' },
  { icon: 'shield', title: 'Safety & comfort', text: 'Licensed drivers, well-maintained vehicles and guides who put your wellbeing first.' },
  { icon: 'heart', title: 'Genuine hospitality', text: 'Sri Lankan warmth is real. We treat every guest like family from pick-up to farewell.' },
]

export default function About() {
  usePageTitle('About us')

  return (
    <>
      <PageHeader eyebrow="About us" title="Local people, sharing the place we love">
        A family-run travel company based in the mask-carving town of Ambalangoda.
      </PageHeader>

      <section className="section">
        <div className="container split">
          <div className="prose">
            <h2>Our story</h2>
            <p>
              Ambalangoda Travels started with a single van and a simple idea: show visitors the
              south coast the way locals know it. Not just the famous sights, but the quiet
              river islands, the mask workshops, the fishing harbours at dawn and the
              best rice and curry in town.
            </p>
            <p>
              Today we arrange day tours, excursions, airport transfers and complete round tours
              across Sri Lanka. Whether you have a few hours or a few weeks, we plan every trip
              around you, your pace, your interests and your budget.
            </p>
            <Link to="/tours" className="btn btn--accent">
              See our tours <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="stats">
            <div><strong>7+</strong><span>Signature tours</span></div>
            <div><strong>24/7</strong><span>Airport transfers</span></div>
            <div><strong>100%</strong><span>Private tours</span></div>
            <div><strong>1</strong><span>Beautiful island</span></div>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="section__head center">
            <span className="eyebrow">What we believe</span>
            <h2>Travel that feels personal</h2>
          </div>
          <div className="grid grid--3">
            {values.map((value) => (
              <div className="card value-card" key={value.title}>
                <span className="feature__icon feature__icon--dark">
                  <Icon name={value.icon} size={26} />
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
