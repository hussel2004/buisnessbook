import type { Promotion } from '@/types'
import { Tag, Calendar, Percent } from 'lucide-react'
import { format } from 'date-fns'

interface PromotionCardProps {
  promotion: Promotion
}

export default function PromotionCard({ promotion }: PromotionCardProps) {
  return (
    <div className="bg-gradient-to-r from-primary-50/50 to-blue-50 border border-primary-200 dark:border-primary-800 rounded-lg p-4 transition-all duration-300 hover:shadow-card-hover animate-fade-in">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-lg text-primary-900 dark:text-primary-100">{promotion.title}</h4>
        {promotion.isActive && (
          <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded animate-pulse">
            Active
          </span>
        )}
      </div>

      {promotion.description && (
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{promotion.description}</p>
      )}

      <div className="space-y-2 text-sm">
        {promotion.discountPercentage && (
          <div className="flex items-center text-primary-700 dark:text-primary-300">
            <Percent className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="font-semibold">{promotion.discountPercentage}% OFF</span>
          </div>
        )}

        {promotion.promoCode && (
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Tag className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              Code: <code className="px-2 py-1 bg-white dark:bg-gray-700 rounded font-mono text-xs">{promotion.promoCode}</code>
            </span>
          </div>
        )}

        {promotion.expiryDate && (
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              Expires: {format(new Date(promotion.expiryDate), 'MMM dd, yyyy')}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
