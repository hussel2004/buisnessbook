'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { businessAPI } from '@/lib/api'
import type { Business } from '@/types'
import LightBuisnessCard from '@/components/LightBuisnessCard'
import { Search, Filter, MapPin } from 'lucide-react'

const CATEGORIES = [
  'All',
  'Restaurant',
  'Retail',
  'Services',
  'Technology',
  'Healthcare',
  'Education',
  'Entertainment',
  'Other',
]

export default function DirectoryPage() {
  const searchParams = useSearchParams()
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [searchName, setSearchName] = useState(searchParams.get('name') || '')
  const [searchLocation, setSearchLocation] = useState(searchParams.get('location') || '')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    loadBusinesses()
  }, [page, selectedCategory])

  useEffect(() => {
    if (searchParams.get('name') || searchParams.get('location')) {
      setSearchName(searchParams.get('name') || '')
      setSearchLocation(searchParams.get('location') || '')
      handleSearch()
    } else {
      loadBusinesses()
    }
  }, [searchParams])

  const loadBusinesses = async () => {
    setLoading(true)
    try {
      let data
      if (selectedCategory !== 'All') {
        data = await businessAPI.getByCategory(selectedCategory, page, 12)
      } else {
        data = await businessAPI.getAll(page, 12)
      }
      setBusinesses(data.content)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Error loading businesses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchName.trim() && !searchLocation.trim()) {
      loadBusinesses()
      return
    }

    setLoading(true)
    try {
      const data = await businessAPI.searchAdvanced(searchName, searchLocation, page, 12)
      setBusinesses(data.content)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Error searching businesses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(0)
    handleSearch()
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('')
    setPage(0)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <div className="h-10 w-1 bg-gradient-to-b from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400 rounded-full mr-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Business Directory</h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:rounded-lg md:shadow-button md:overflow-hidden">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search by business name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-0 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 transition-all duration-200 rounded-lg md:rounded-none"
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
                  className="block w-full pl-10 pr-3 py-3 border-0 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 transition-all duration-200 rounded-lg md:rounded-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-700 dark:to-primary-800 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white font-semibold transition-all duration-200 hover:scale-105 rounded-lg md:rounded-none"
              >
                Search
              </button>
            </div>
          </form>

          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-button scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : businesses.length > 0 ? (
          <>
            <div className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400 animate-fade-in">
              Found {businesses.length} business{businesses.length !== 1 ? 'es' : ''}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businesses.map((business) => (
                <div key={business.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-shadow animate-fade-in">
                  <LightBuisnessCard business={business} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2 animate-fade-in">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                  className="px-4 py-2 border border-primary-200 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  Previous
                </button>
                <span className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages - 1}
                  className="px-4 py-2 border border-primary-200 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900 dark:to-blue-900 flex items-center justify-center">
              <Search className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg font-medium">No businesses found</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
                setPage(0)
                loadBusinesses()
              }}
              className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-md font-medium transition-all duration-200 hover:scale-105 shadow-button"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
