'use client'

import { useParams } from 'next/navigation'
import { Building2 } from 'lucide-react'

export default function BusinessAgenciesPage() {
  const params = useParams()
  const businessId = Number(params.id)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Agencies</h2>

      {/* Placeholder for future agencies feature */}
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900 dark:to-blue-900 flex items-center justify-center">
          <Building2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Agencies Coming Soon
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          This business hasn't added any agencies yet. Check back later for updates on associated
          agencies and branches.
        </p>
      </div>
    </div>
  )
}
