'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { businessAPI, postAPI, promotionAPI } from '@/lib/api'
import type { Business, Post, Promotion } from '@/types'
import BuisnessOverviewCard from '@/components/BuisnessOverviewCard'
import PostCard from '@/components/PostCard'
import PromotionCard from '@/components/PromotionCard'

export default function BusinessHomePage() {
  const params = useParams()
  const businessId = Number(params.id)

  const [business, setBusiness] = useState<Business | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [businessData, postsData, promotionsData] = await Promise.all([
          businessAPI.getById(businessId),
          postAPI.getByBusiness(businessId).catch(() => []),
          promotionAPI.getByBusiness(businessId).catch(() => []),
        ])

        setBusiness(businessData)
        setPosts(postsData)
        setPromotions(promotionsData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (businessId) {
      loadData()
    }
  }, [businessId])

  if (loading || !business) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Business Overview */}
      <BuisnessOverviewCard business={business} />

      {/* Recent Posts Section */}
      {posts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Posts
          </h2>
          <div className="space-y-4">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Active Promotions Section */}
      {promotions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Active Promotions
          </h2>
          <div className="space-y-4">
            {promotions.slice(0, 3).map((promo) => (
              <PromotionCard key={promo.id} promotion={promo} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {posts.length === 0 && promotions.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-12 text-center animate-fade-in">
          <p className="text-gray-500 dark:text-gray-400">
            No posts or promotions available yet.
          </p>
        </div>
      )}
    </div>
  )
}
