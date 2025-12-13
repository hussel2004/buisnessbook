'use client'

import { Business } from '@/types'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface BuisnessOverviewCardProps {
  business: Business
}

export default function BuisnessOverviewCard({ business }: BuisnessOverviewCardProps) {
  const truncateDescription = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Company Overview
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        {business.description
          ? truncateDescription(business.description)
          : 'No description available for this business.'}
      </p>

      <Link
        href={`/business/${business.id}/about`}
        className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors group"
      >
        <span>Explore More</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
}
