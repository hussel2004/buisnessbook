'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { Role } from '@/types'
import { Building2, LogOut, User } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { user, isAuthenticated, logout, hasRole } = useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full border-b transition-colors duration-300
      bg-[var(--background)] border-[var(--border)] backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left: Brand & Primary Nav */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
              <div className="p-1.5 rounded-xl bg-primary-600 dark:bg-primary-500 shadow-button">
                <Building2 className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                BusinessBook
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {[
                { name: 'Home', href: '/' },
                { name: 'Directory', href: '/directory' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all
                    text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 
                    hover:bg-primary-50 dark:hover:bg-primary-900/20"
                >
                  {link.name}
                </Link>
              ))}
              
              {isAuthenticated && hasRole(Role.BUSINESS_OWNER) && (
                <Link
                  href="/owner/dashboard"
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all
                    text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400
                    hover:bg-primary-50 dark:hover:bg-primary-900/20"
                >
                  My Businesses
                </Link>
              )}
            </div>
          </div>

          {/* Right: Actions & User State */}
          <div className="flex items-center gap-4">
            <div className="pr-2 border-r border-[var(--border)]">
              <ThemeToggle />
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end gap-0.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    {user?.role}
                  </span>
                  <span className="text-sm font-medium text-[var(--text-secondary)]">
                    {user?.email}
                  </span>
                </div>
                
                <button
                  onClick={logout}
                  className="p-2.5 rounded-xl text-red-600 hover:text-white hover:bg-red-600 
                    dark:text-red-400 dark:hover:bg-red-500/20 transition-all active:scale-95"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
           <div className="flex items-center gap-2">
  <Link
    href="/auth/login"
    className="px-4 py-2 text-sm font-semibold rounded-xl transition-all
      text-[var(--foreground)] hover:bg-[var(--background-secondary)]"
  >
    Log in
  </Link>
  
  <Link
    href="/auth/register"
    className="px-5 py-2 text-sm font-semibold rounded-xl transition-all active:scale-95 animate-scale-in
      /* Text color matches Login button */
      text-[var(--foreground)]
      /* Border and Shadow to show importance */
      border border-[var(--border)] shadow-sm
      /* Hover effects */
      hover:bg-[var(--background-secondary)] hover:border-primary-500 dark:hover:border-primary-400"
  >
    Get Started
  </Link>
</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}