import Icon from './Icon'

const gradients = [
  ['#0b4f5c', '#1f8a8a'],
  ['#e8683f', '#f2b544'],
  ['#1f6f50', '#8fbf6a'],
  ['#274c77', '#6096ba'],
  ['#8a3b52', '#e8683f'],
]

const pickGradient = (seed = '') => {
  let hash = 0
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return gradients[hash % gradients.length]
}

// Shows the uploaded image, or a branded gradient when no image has been uploaded yet
export default function Media({ src, alt = '', seed = alt, className = '' }) {
  if (src) {
    return <img className={`media ${className}`} src={src} alt={alt} loading="lazy" />
  }

  const [from, to] = pickGradient(seed)

  return (
    <div
      className={`media media--placeholder ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      role="img"
      aria-label={alt}
    >
      <Icon name="wave" size={44} />
    </div>
  )
}
