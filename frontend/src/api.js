const API_BASE = import.meta.env.VITE_API_URL || '/api'
const TOKEN_KEY = 'amb_admin_token'

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Storage unavailable (private mode); the session just won't persist
  }
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {}
  let payload = body

  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
    payload = JSON.stringify(body)
  }

  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(`${API_BASE}${path}`, { method, headers, body: payload })
  } catch {
    throw new ApiError('Cannot reach the server. Please try again in a moment.', 0)
  }

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    if (res.status === 401 && auth) {
      setToken(null)
      window.dispatchEvent(new Event('auth:logout'))
    }
    throw new ApiError(data?.message || `Request failed (${res.status})`, res.status)
  }

  return data
}

export const api = {
  get: (path, options) => request(path, options),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  del: (path, options) => request(path, { ...options, method: 'DELETE' }),
}
