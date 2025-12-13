'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { businessAPI, commentAPI } from '@/lib/api'
import type { Business, Comment } from '@/types'
import BuisnessBannerCard from '@/components/BuisnessBannerCard'
import ContactModal from '@/components/ContactModal'
import SimilarBuisnessSideCard from '@/components/SimilarBuisnessSideCard'
import CommentsSidebar from '@/components/CommentsSidebar'

export default function BusinessLayout({ children }: { children: React.Node }) {
  const params = useParams()
  const businessId = Number(params.id)

  const [business, setBusiness] = useState<Business | null>(null)
  const [similarBusinesses, setSimilarBusinesses] = useState<Business[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [contactModalOpen, setContactModalOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [businessData, popularData, commentsData] = await Promise.all([
          businessAPI.getById(businessId),
          businessAPI.getPopular(0, 10).catch(() => ({ content: [] })),
          commentAPI.getByBusiness(businessId).catch(() => []),
        ])

        setBusiness(businessData)

        // Filter similar businesses by category
        const similar = businessData.category
          ? popularData.content.filter((b: Business) => b.category === businessData.category)
          : popularData.content

        setSimilarBusinesses(similar)
        setComments(commentsData)
      } catch (error) {
        console.error('Error loading business:', error)
      } finally {
        setLoading(false)
      }
    }

    if (businessId) {
      loadData()
    }
  }, [businessId])

  const handleCommentAdded = (comment: Comment) => {
    setComments([comment, ...comments])
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading business...</p>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Business not found
          </h2>
          <a
            href="/directory"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition-all"
          >
            Back to Directory
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Banner Card */}
        <div className="mb-6">
          <BuisnessBannerCard
            business={business}
            onContactClick={() => setContactModalOpen(true)}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">{children}</div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <SimilarBuisnessSideCard
              businesses={similarBusinesses}
              currentBusinessId={business.id}
            />
            <CommentsSidebar
              businessId={business.id}
              comments={comments}
              onCommentAdded={handleCommentAdded}
            />
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        businessId={business.id}
        businessName={business.name}
      />
    </div>
  )
}
