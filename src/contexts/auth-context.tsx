import { createContext, useContext, useState, useEffect, ReactNode, createElement } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('admin_auth') === 'true')
  }, [])

  const login = () => {
    localStorage.setItem('admin_auth', 'true')
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('admin_auth')
    setIsAuthenticated(false)
  }

  return createElement(
    AuthContext.Provider,
    { value: { isAuthenticated, login, logout } },
    children,
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
