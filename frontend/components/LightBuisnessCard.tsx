'use client'

import { Business } from '@/types'
import { MapPin, Star } from 'lucide-react'
import Link from 'next/link'

interface LightBuisnessCardProps {
  business: Business
}

export default function LightBuisnessCard({ business }: LightBuisnessCardProps) {
  return (
    <Link
      href={`/business/${business.id}`}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
    >
      {/* Logo */}
      {business.logoUrl ? (
        <img
          src={business.logoUrl}
          alt={business.name}
          className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
        />
      ) : (
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
            {business.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
          {business.name}
        </h3>

        {business.category && (
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
            {business.category}
          </p>
        )}

        {business.address && (
          <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{business.address}</span>
          </div>
        )}

        {business.averageRating !== undefined && business.averageRating > 0 && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {business.averageRating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
