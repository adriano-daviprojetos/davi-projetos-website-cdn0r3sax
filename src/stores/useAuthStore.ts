import { useState } from 'react'

export default function useAuthStore() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('admin_auth') === 'true'
  })

  const login = () => {
    localStorage.setItem('admin_auth', 'true')
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('admin_auth')
    setIsAuthenticated(false)
  }

  return { isAuthenticated, login, logout }
}
