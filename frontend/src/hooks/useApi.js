import { useCallback, useEffect, useState } from 'react'
import { api } from '../api'

// Loads `path` on mount and whenever it changes. `reload` refetches without showing a spinner.
export default function useApi(path, { auth = false } = {}) {
  const [state, setState] = useState({ path: null, data: null, error: null })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!path) return
    let active = true

    api
      .get(path, { auth })
      .then((data) => active && setState({ path, data, error: null }))
      .catch((err) => active && setState({ path, data: null, error: err.message }))

    return () => {
      active = false
    }
  }, [path, auth, reloadKey])

  const reload = useCallback(() => setReloadKey((key) => key + 1), [])

  return {
    data: state.data,
    error: state.error,
    loading: Boolean(path) && state.path !== path,
    reload,
  }
}
