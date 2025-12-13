'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Get system preference (only used if theme is explicitly set to 'system')
  const getSystemPreference = (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // Calculate if dark mode should be active
  const calculateIsDark = (currentTheme: Theme): boolean => {
    if (currentTheme === 'dark') return true
    if (currentTheme === 'light') return false
    return getSystemPreference()
  }

  // Apply theme to document
  const applyTheme = (dark: boolean) => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme-preference', newTheme)

    const dark = calculateIsDark(newTheme)
    setIsDark(dark)
    applyTheme(dark)
  }

  // Toggle between light and dark (skip system)
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true)

    // Load saved preference or default to light
    const savedTheme = localStorage.getItem('theme-preference') as Theme | null
    const initialTheme = savedTheme || 'light'

    setThemeState(initialTheme)
    const dark = calculateIsDark(initialTheme)
    setIsDark(dark)
    applyTheme(dark)

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setIsDark(e.matches)
        applyTheme(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Update when theme changes
  useEffect(() => {
    if (mounted && theme === 'system') {
      const dark = getSystemPreference()
      setIsDark(dark)
      applyTheme(dark)
    }
  }, [theme, mounted])

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
