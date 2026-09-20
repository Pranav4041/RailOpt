import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { weeklyBlocks } from '@/data/plan'

/**
 * One store for the things more than one screen needs to agree on: who is
 * looking, whether the optimised plan has been revealed yet, which blocks a
 * controller has signed, and whether the presentation walkthrough is running.
 *
 * Deliberately small. Anything derivable from the data is derived in
 * lib/optimizer.js rather than held here.
 */

export const ROLES = [
  { id: 'admin', label: 'Super Admin', short: 'Admin' },
  { id: 'engineering', label: 'Engineering', short: 'Eng' },
  { id: 'snt', label: 'S&T', short: 'S&T' },
  { id: 'trd', label: 'TRD', short: 'TRD' },
]

export const roleById = Object.fromEntries(ROLES.map((r) => [r.id, r]))

const AppStateContext = createContext(null)

export function AppStateProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  
  const login = useCallback((roleId) => {
    setCurrentUser(roleById[roleId])
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
  }, [])

  const value = useMemo(
    () => ({
      currentUser,
      login,
      logout,
      role: currentUser,
    }),
    [currentUser, login, logout]
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider')
  return ctx
}
