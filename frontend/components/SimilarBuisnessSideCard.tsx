'use client'

import { Business } from '@/types'
import LightBuisnessCard from './LightBuisnessCard'

interface SimilarBuisnessSideCardProps {
  businesses: Business[]
  currentBusinessId: number
}

export default function SimilarBuisnessSideCard({ businesses, currentBusinessId }: SimilarBuisnessSideCardProps) {
  const similarBusinesses = businesses
    .filter((b) => b.id !== currentBusinessId)
    .slice(0, 5)

  if (similarBusinesses.length === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-5 sticky top-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Similar Businesses
      </h3>
      <div className="space-y-1">
        {similarBusinesses.map((business) => (
          <LightBuisnessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  )
}
