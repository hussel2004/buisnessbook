'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { businessAPI } from '@/lib/api'
import type { Business } from '@/types'
import LightBuisnessCard from '@/components/LightBuisnessCard'
import { Search, Filter, MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react'

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

  // FIXED: setSearchQuery replaced with logic to clear search inputs
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSearchName('')
    setSearchLocation('')
    setPage(0)
  }

  const clearAllFilters = () => {
    setSearchName('')
    setSearchLocation('')
    setSelectedCategory('All')
    setPage(0)
    loadBusinesses()
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      
      {/* Header & Search Section */}
      <header className="pt-16 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-2">Directory.</h1>
            <p className="text-slate-500 font-medium">Explore local excellence across all industries.</p>
          </div>
          
          <div className="text-sm font-mono text-slate-400">
            {businesses.length > 0 && `RESULTS_FOUND: ${businesses.length}`}
          </div>
        </div>

        {/* Search Bar - Matching Homepage Aesthetic */}
        <form onSubmit={handleSearchSubmit} className="mb-12">
          <div className="flex flex-col md:flex-row items-stretch border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex-1 flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-slate-900">
              <Search className="w-5 h-5 mr-3 text-slate-400" />
              <input 
                placeholder="Business name..." 
                className="w-full outline-none font-medium placeholder:text-slate-300 bg-transparent"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-6 py-4">
              <MapPin className="w-5 h-5 mr-3 text-slate-400" />
              <input 
                placeholder="Location..." 
                className="w-full outline-none font-medium placeholder:text-slate-300 bg-transparent"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <button className="bg-slate-900 text-white px-8 py-4 font-bold hover:bg-slate-800 transition-colors uppercase tracking-widest text-xs">
              Filter
            </button>
          </div>
        </form>

        {/* Category Filter - Minimalist Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar border-b border-slate-100">
          <Filter className="w-4 h-4 text-slate-900 mr-2 shrink-0" />
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border-2 ${
                selectedCategory === category
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[4/3] bg-slate-100 rounded-lg" />
                <div className="h-6 bg-slate-100 rounded w-3/4" />
                <div className="h-4 bg-slate-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : businesses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {businesses.map((business) => (
                <div key={business.id} className="group">
                  <LightBuisnessCard business={business} />
                </div>
              ))}
            </div>

            {/* Pagination - Minimalist */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-8 border-t border-slate-100 pt-10">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                  className="p-2 border-2 border-slate-900 rounded-full disabled:opacity-20 disabled:border-slate-200 transition-transform active:scale-90"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-bold tracking-widest uppercase">
                  Page {page + 1} <span className="text-slate-300">/</span> {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages - 1}
                  className="p-2 border-2 border-slate-900 rounded-full disabled:opacity-20 disabled:border-slate-200 transition-transform active:scale-90"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-32 border-2 border-dashed border-slate-100 rounded-3xl">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-slate-50 rounded-full">
                <X className="w-8 h-8 text-slate-300" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-2">No results found</h3>
            <p className="text-slate-400 mb-8">Try adjusting your filters or search terms.</p>
            <button
              onClick={clearAllFilters}
              className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}