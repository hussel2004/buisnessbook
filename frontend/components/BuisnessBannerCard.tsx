'use client'

import { Business } from '@/types'
import { MapPin, Globe, Mail, Home, Info, Megaphone, FileText, Building2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BuisnessBannerCardProps {
  business: Business
  onContactClick: () => void
}

export default function BuisnessBannerCard({ business, onContactClick }: BuisnessBannerCardProps) {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Home', href: `/business/${business.id}`, icon: Home },
    { name: 'About', href: `/business/${business.id}/about`, icon: Info },
    { name: 'Posts', href: `/business/${business.id}/posts`, icon: FileText },
    { name: 'Promotions', href: `/business/${business.id}/promotions`, icon: Megaphone },
    { name: 'Agencies', href: `/business/${business.id}/agencies`, icon: Building2 },
  ]

  const isActiveLink = (href: string) => {
    if (href === `/business/${business.id}`) {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-fade-in">
      {/* Cover Banner */}
      <div className="relative h-48 md:h-64">
        {business.coverImageUrl ? (
          <img
            src={business.coverImageUrl}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Company Banner Image</h2>
          </div>
        )}
      </div>

      {/* Logo - Overlapping the banner */}
      <div className="relative px-6">
        <div className="absolute -top-16 md:-top-20">
          {business.logoUrl ? (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white dark:bg-gray-800 p-1 shadow-xl">
              <img
                src={business.logoUrl}
                alt={business.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-xl">
              {business.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 pt-20 md:pt-24 pb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          {/* Left: Business Info */}
          <div className="flex-1">
            {/* Business Name */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {business.name}
            </h1>

            {/* Category/Service */}
            {(business.category || business.service) && (
              <p className="text-base md:text-lg text-primary-600 dark:text-primary-400 font-medium mb-3">
                {business.service || business.category}
              </p>
            )}

            {/* Location and Website */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {business.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="line-clamp-1">{business.address}</span>
                </div>
              )}

              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Globe className="h-4 w-4 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {business.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Right: Contact Button */}
          <div className="flex-shrink-0">
            <button
              onClick={onContactClick}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Mail className="h-5 w-5" />
              <span>Contact Us</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="border-t border-gray-200 dark:border-gray-700 -mx-6 px-6 pt-2">
          <div className="flex gap-1 md:gap-2 overflow-x-auto">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                    isActiveLink(link.href)
                      ? 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
