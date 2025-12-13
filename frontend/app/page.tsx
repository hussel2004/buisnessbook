'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { businessAPI } from '@/lib/api'
import type { Business } from '@/types'
import { Search, MapPin, Phone, Globe, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [popularBusinesses, setPopularBusinesses] = useState<Business[]>([])
  const [searchName, setSearchName] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBusinesses()
  }, [])

  const loadBusinesses = async () => {
    try {
      const [allData, popularData] = await Promise.all([
        businessAPI.getAll(0, 6),
        businessAPI.getPopular(0, 3),
      ])
      setBusinesses(allData.content)
      setPopularBusinesses(popularData.content)
    } catch (error) {
      console.error('Error loading businesses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchName.trim() || searchLocation.trim()) {
      const params = new URLSearchParams()
      if (searchName.trim()) params.set('name', searchName)
      if (searchLocation.trim()) params.set('location', searchLocation)
      window.location.href = `/directory?${params.toString()}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-blue-700 dark:from-primary-700 dark:via-primary-800 dark:to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
              Discover Local Businesses
            </h1>
            <p className="text-xl text-gray-700 dark:text-white/90 mb-8 animate-fade-in">
              Connect with the best businesses in your community
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto animate-slide-up">
              <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:rounded-lg md:shadow-button md:overflow-hidden">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 animate-pulse" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by business name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-4 border-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 transition-all duration-200 rounded-lg md:rounded-none"
                  />
                </div>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="block w-full pl-10 pr-3 py-4 border-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 transition-all duration-200 rounded-lg md:rounded-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-800 hover:to-primary-900 dark:from-primary-600 dark:to-primary-700 dark:hover:from-primary-700 dark:hover:to-primary-800 text-white font-semibold transition-all duration-200 hover:scale-105 rounded-lg md:rounded-none"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Businesses */}
        {popularBusinesses.length > 0 && (
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center mb-6">
              <div className="h-8 w-1 bg-gradient-to-b from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400 rounded-full mr-3" />
              <TrendingUp className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Popular Businesses</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} featured />
              ))}
            </div>
          </div>
        )}

        {/* Recent Businesses */}
        <div className="animate-fade-in">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-gradient-to-b from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400 rounded-full mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Listings</h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-12">No businesses found</p>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/directory"
              className="inline-block px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-700 dark:to-primary-800 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white rounded-md shadow-button font-medium transition-all duration-200 hover:scale-105"
            >
              View All Businesses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function BusinessCard({ business, featured = false }: { business: Business; featured?: boolean }) {
  return (
    <Link
      href={`/business/${business.id}`}
      className={`group block bg-white dark:bg-gray-800 rounded-lg border border-primary-100/50 dark:border-gray-700 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02] overflow-hidden animate-fade-in ${
        featured ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''
      }`}
    >
      {business.coverImageUrl ? (
        <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <img
            src={business.coverImageUrl}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary-600 dark:text-primary-300">
            {business.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{business.name}</h3>
          {business.category && (
            <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900 dark:to-blue-900 text-primary-700 dark:text-primary-200 rounded-full">
              {business.category}
            </span>
          )}
        </div>

        {business.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{business.description}</p>
        )}

        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
          {business.address && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="line-clamp-1">{business.address}</span>
            </div>
          )}
          {business.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{business.phone}</span>
            </div>
          )}
          {business.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="line-clamp-1 text-primary-600 dark:text-primary-400 hover:underline">
                {business.website}
              </span>
            </div>
          )}
        </div>

        {featured && (
          <div className="mt-4 pt-4 border-t dark:border-gray-700">
            <div className="flex items-center text-sm">
              <div className="flex items-center px-3 py-1 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/50 dark:to-blue-900/50 rounded-full text-primary-700 dark:text-primary-300">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="font-medium">{business.viewCount} views</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
