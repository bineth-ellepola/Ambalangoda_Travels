import Icon, { WhatsAppIcon } from '../components/Icon'
import InquiryForm from '../components/InquiryForm'
import PageHeader from '../components/PageHeader'
import useApi from '../hooks/useApi'
import usePageTitle from '../hooks/usePageTitle'
import { site, whatsappLink } from '../siteConfig'

export default function Contact() {
  usePageTitle('Contact & booking')
  const { data: tours } = useApi('/tours')

  return (
    <>
      <PageHeader eyebrow="Contact & booking" title="Let's plan your trip">
        Send us an inquiry and we will reply within 24 hours with a personalised plan and price.
      </PageHeader>

      <section className="section">
        <div className="container contact">
          <div className="card contact__form">
            <h2>Send an inquiry</h2>
            <InquiryForm tours={tours || []} />
          </div>

          <aside className="contact__info">
            <div className="card">
              <h3>Get in touch</h3>
              <ul className="contact-list">
                <li>
                  <Icon name="phone" />
                  <div>
                    <small>Call us</small>
                    <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
                  </div>
                </li>
                <li>
                  <Icon name="mail" />
                  <div>
                    <small>Email</small>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </div>
                </li>
                <li>
                  <Icon name="pin" />
                  <div>
                    <small>Visit us</small>
                    <span>{site.address}</span>
                  </div>
                </li>
              </ul>
              <a className="btn btn--whatsapp btn--block" href={whatsappLink()} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={20} /> Chat on WhatsApp
              </a>
            </div>
            <iframe
              className="map"
              title="Map of Ambalangoda"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </aside>
        </div>
      </section>
    </>
  )
}
