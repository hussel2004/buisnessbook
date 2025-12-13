'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { Role } from '@/types'
import { Building2, LogOut, User, LayoutDashboard } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { user, isAuthenticated, logout, hasRole } = useAuth()

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-900 border-b dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <Building2 className="h-8 w-8 text-transparent bg-gradient-to-br from-primary-600 to-blue-600 bg-clip-text transition-transform group-hover:scale-110 duration-200" strokeWidth={2.5} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
              <span className="text-xl font-bold text-gray-900 dark:text-white">BusinessBook</span>
            </Link>

            <div className="hidden md:flex space-x-1">
              <Link
                href="/"
                className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </Link>
              <Link
                href="/directory"
                className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors group"
              >
                Directory
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </Link>
              {isAuthenticated && hasRole(Role.BUSINESS_OWNER) && (
                <Link
                  href="/owner/dashboard"
                  className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium border border-transparent hover:border-primary-200 dark:hover:border-primary-800 transition-all group"
                >
                  My Businesses
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  <User className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  <span className="hidden sm:inline">{user?.email}</span>
                  <span className="px-3 py-1 text-xs rounded-full font-medium bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900 dark:to-blue-900 text-primary-700 dark:text-primary-200">
                    {user?.role}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 border border-primary-600 dark:border-primary-500 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-700 dark:to-primary-800 dark:hover:from-primary-600 dark:hover:to-primary-700 rounded-md shadow-button transition-all duration-200 hover:scale-105"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
