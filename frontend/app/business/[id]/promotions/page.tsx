'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { promotionAPI } from '@/lib/api'
import type { Promotion } from '@/types'
import PromotionCard from '@/components/PromotionCard'

export default function BusinessPromotionsPage() {
  const params = useParams()
  const businessId = Number(params.id)

  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        const data = await promotionAPI.getByBusiness(businessId)
        setPromotions(data)
      } catch (error) {
        console.error('Error loading promotions:', error)
      } finally {
        setLoading(false)
      }
    }

    if (businessId) {
      loadPromotions()
    }
  }, [businessId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">All Promotions</h2>

      {promotions.length > 0 ? (
        <div className="space-y-4">
          {promotions.map((promo) => (
            <PromotionCard key={promo.id} promotion={promo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No active promotions at this time.</p>
        </div>
      )}
    </div>
  )
}
