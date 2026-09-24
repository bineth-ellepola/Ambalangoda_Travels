// Business details shown across the site.
// TODO: replace the placeholder contact details below with the real ones.
export const site = {
  name: 'Ambalangoda Travels',
  tagline: "Tours & transfers on Sri Lanka's south coast",
  phone: '+94 77 123 4567',
  whatsapp: '94771234567', // digits only, with country code
  email: 'info@ambalangodatravels.com',
  address: 'Main Street, Ambalangoda, Sri Lanka',
  mapQuery: 'Ambalangoda, Sri Lanka',
  currency: 'US$',
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    tripadvisor: 'https://tripadvisor.com/',
  },
}

export const whatsappLink = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const formatPrice = (price) => `${site.currency}${Number(price).toLocaleString()}`
