'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from './api'
import type { AuthResponse, AuthRequest, RegisterRequest, Role } from '@/types'

interface AuthContextType {
  user: AuthResponse | null
  loading: boolean
  login: (data: AuthRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  hasRole: (role: Role) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Load user from localStorage on mount
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (data: AuthRequest) => {
    const response = await authAPI.login(data)
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response))
    setUser(response)
    router.push('/')
  }

  const register = async (data: RegisterRequest) => {
    const response = await authAPI.register(data)
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response))
    setUser(response)
    router.push('/')
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/auth/login')
  }

  const hasRole = (role: Role): boolean => {
    return user?.role === role
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Protected route HOC
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: Role
) {
  return function ProtectedRoute(props: P) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push('/auth/login')
      } else if (!loading && requiredRole && user?.role !== requiredRole) {
        router.push('/')
      }
    }, [user, loading, router])

    if (loading || !user) {
      return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    if (requiredRole && user.role !== requiredRole) {
      return null
    }

    return <Component {...props} />
  }
}
