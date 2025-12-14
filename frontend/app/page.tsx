'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { businessAPI } from '@/lib/api'
import type { Business } from '@/types'
import { Search, MapPin, ArrowUpRight, Loader2 } from 'lucide-react'

export default function HomePage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [popularBusinesses, setPopularBusinesses] = useState<Business[]>([])
  const [searchName, setSearchName] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadBusinesses() }, [])

  const loadBusinesses = async () => {
    try {
      const [allData, popularData] = await Promise.all([
        businessAPI.getAll(0, 6),
        businessAPI.getPopular(0, 3),
      ])
      setBusinesses(allData.content)
      setPopularBusinesses(popularData.content)
    } catch (error) { 
      console.error(error) 
    } finally { 
      setLoading(false) 
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchName.trim()) params.set('name', searchName)
    if (searchLocation.trim()) params.set('location', searchLocation)
    window.location.href = `/directory?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      
      {/* Hero Section - Elevated to the top */}
      <section className="pt-24 pb-32 max-w-5xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.1]">
          Find the best services, <br />
          <span className="text-slate-400 italic font-serif">refined for you.</span>
        </h1>
        
        {/* Search Bar - High Contrast Utility */}
        <form onSubmit={handleSearch} className="relative mt-12">
          <div className="flex flex-col md:flex-row items-stretch border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex-1 flex items-center px-6 py-5 border-b md:border-b-0 md:border-r border-slate-900">
              <Search className="w-5 h-5 mr-3 text-slate-400" />
              <input 
                placeholder="Business name..." 
                className="w-full outline-none font-medium placeholder:text-slate-300 bg-transparent"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-6 py-5">
              <MapPin className="w-5 h-5 mr-3 text-slate-400" />
              <input 
                placeholder="City or zip..." 
                className="w-full outline-none font-medium placeholder:text-slate-300 bg-transparent"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <button className="bg-slate-900 text-white px-10 py-5 font-bold hover:bg-slate-800 transition-colors uppercase tracking-widest text-sm">
              Search
            </button>
          </div>
        </form>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-40">
        
        {/* Popular Section */}
        {popularBusinesses.length > 0 && (
          <div className="mb-24">
            <div className="flex items-end justify-between mb-10 border-b border-slate-100 pb-4">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">Top Rated</h2>
              <Link href="/directory?sort=popular" className="text-sm font-semibold flex items-center gap-1 hover:underline underline-offset-4">
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularBusinesses.map((b) => <BusinessCard key={b.id} business={b} />)}
            </div>
          </div>
        )}

        {/* Recent Listings */}
        <div>
          <div className="mb-10 border-b border-slate-100 pb-4">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">Latest Additions</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-slate-200" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {businesses.map((b) => <BusinessCard key={b.id} business={b} />)}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function BusinessCard({ business }: { business: Business }) {
  return (
    <Link href={`/business/${business.id}`} className="group block">
      <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg bg-slate-50 border border-slate-100">
        {business.coverImageUrl ? (
          <img 
            src={business.coverImageUrl} 
            alt={business.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-4xl">
            {business.name.charAt(0)}
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded shadow-sm border border-slate-100">
            {business.category}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold tracking-tight group-hover:underline decoration-2 underline-offset-4">
            {business.name}
          </h3>
          <span className="text-sm font-mono text-slate-400">{business.viewCount} views</span>
        </div>
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
          {business.description || "No description provided for this listing."}
        </p>
        <div className="flex items-center text-xs font-medium text-slate-400 pt-2">
          <MapPin className="w-3 h-3 mr-1" />
          {business.address || 'Location on request'}
        </div>
      </div>
    </Link>
  )
}