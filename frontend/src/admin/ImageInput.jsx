import { useState } from 'react'
import Media from '../components/Media'

export default function ImageInput({ current, onChange, label = 'Image' }) {
  const [preview, setPreview] = useState(null)

  const pick = (event) => {
    const file = event.target.files[0] || null
    if (preview) URL.revokeObjectURL(preview)
    setPreview(file ? URL.createObjectURL(file) : null)
    onChange(file)
  }

  return (
    <div className="image-input">
      <Media src={preview || current} alt="Image preview" className="image-input__preview" />
      <label>
        {label}
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={pick} />
        <small className="muted">JPG, PNG or WEBP, up to 8 MB</small>
      </label>
    </div>
  )
}
