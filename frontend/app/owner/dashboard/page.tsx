'use client'

import { useEffect, useState } from 'react'
import { useAuth, withAuth } from '@/lib/auth'
import { businessAPI } from '@/lib/api'
import type { Business } from '@/types'
import { Role } from '@/types'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, TrendingUp } from 'lucide-react'

function BusinessOwnerDashboard() {
  const { user } = useAuth()
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBusinesses()
  }, [])

  const loadBusinesses = async () => {
    try {
      console.log('Loading businesses...')
      const data = await businessAPI.getMyBusinesses()
      console.log('Businesses loaded:', data)
      setBusinesses(data)
    } catch (error: any) {
      console.error('Error loading businesses:', error)
      console.error('Error response:', error.response)
      console.error('Error message:', error.message)
      // Check if it's a 401 (unauthorized) - token might be invalid
      if (error.response?.status === 401) {
        console.error('Authentication failed - redirecting to login')
        // Token might be invalid, clear it
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/auth/login'
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this business?')) return

    try {
      await businessAPI.delete(id)
      setBusinesses(businesses.filter((b) => b.id !== id))
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to delete business')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Businesses</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your business listings</p>
          </div>
          <Link
            href="/owner/business/new"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm"
          >
            <Plus className="h-5 w-5" />
            <span>Add Business</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <div key={business.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                {business.coverImageUrl ? (
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={business.coverImageUrl}
                      alt={business.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement!.innerHTML = `<div class="h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center"><span class="text-4xl font-bold text-blue-600 dark:text-blue-300">${business.name.charAt(0).toUpperCase()}</span></div>`
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-600 dark:text-blue-300">
                      {business.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{business.name}</h3>
                    {business.category && (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded">
                        {business.category}
                      </span>
                    )}
                  </div>

                  {business.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {business.description}
                    </p>
                  )}

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>{business.viewCount} views</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/business/${business.id}`}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </Link>
                    <Link
                      href={`/owner/business/${business.id}/edit`}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(business.id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t dark:border-gray-700 grid grid-cols-2 gap-2">
                    <Link
                      href={`/owner/business/${business.id}/posts`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-center"
                    >
                      Manage Posts
                    </Link>
                    <Link
                      href={`/owner/business/${business.id}/promotions`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-center"
                    >
                      Manage Promotions
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No businesses yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Get started by creating your first business listing</p>
            <Link
              href="/owner/business/new"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm"
            >
              <Plus className="h-5 w-5" />
              <span>Add Your First Business</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default withAuth(BusinessOwnerDashboard, Role.BUSINESS_OWNER)
