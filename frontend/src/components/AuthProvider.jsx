import { useCallback, useEffect, useMemo, useState } from 'react'
import { api, getToken, setToken } from '../api'
import { AuthContext } from '../hooks/useAuth'

export default function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken)

  useEffect(() => {
    const onLogout = () => setTokenState(null)
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [])

  const login = useCallback(async (username, password) => {
    const { token: newToken } = await api.post('/auth/login', { username, password })
    setToken(newToken)
    setTokenState(newToken)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenState(null)
  }, [])

  const value = useMemo(() => ({ token, isAdmin: Boolean(token), login, logout }), [token, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
