'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/theme'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 hover:scale-110 group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-primary-600 dark:text-primary-400 transition-transform duration-300 group-hover:rotate-180" />
      ) : (
        <Moon className="h-5 w-5 text-primary-600 dark:text-primary-400 transition-transform duration-300 group-hover:rotate-12" />
      )}
    </button>
  )
}
