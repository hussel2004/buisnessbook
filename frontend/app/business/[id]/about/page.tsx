'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { businessAPI } from '@/lib/api'
import type { Business } from '@/types'
import {
  Building2,
  Calendar,
  Users,
  Mail,
  Phone,
  Globe,
  MapPin,
  Clock,
  Star,
  Navigation,
} from 'lucide-react'

export default function BusinessAboutPage() {
  const params = useParams()
  const businessId = Number(params.id)

  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const businessData = await businessAPI.getById(businessId)
        setBusiness(businessData)
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

  const openInGoogleMaps = () => {
    if (business?.address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        business.address
      )}`
      window.open(url, '_blank')
    }
  }

  if (loading || !business) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Company Overview Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Company Overview
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-base">
            {business.description || `${business.name} is a leading force in ${business.category || 'the industry'}. Our mission is to empower businesses through innovative solutions and technology.`}
          </p>
        </div>
      </div>

      {/* Key Public Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Key Public Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Headquarters */}
          {business.address && (
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Headquarters</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{business.address}</p>
              </div>
            </div>
          )}

          {/* Industry/Service */}
          {(business.service || business.category) && (
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Industry</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {business.service || business.category}
                </p>
              </div>
            </div>
          )}

          {/* Company Size */}
          {business.numberOfEmployees && (
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Company Size</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {business.numberOfEmployees} employees
                </p>
              </div>
            </div>
          )}

          {/* Founded */}
          {business.yearFounded && (
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Founded</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {business.yearFounded}
                </p>
              </div>
            </div>
          )}

          {/* Primary Contact */}
          {business.phone && (
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <Phone className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Primary Contact</p>
                <a
                  href={`tel:${business.phone}`}
                  className="text-base font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {business.phone}
                </a>
              </div>
            </div>
          )}

          {/* Sales Email */}
          {business.email && (
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <Mail className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Sales Email</p>
                <a
                  href={`mailto:${business.email}`}
                  className="text-base font-semibold text-blue-600 dark:text-blue-400 hover:underline break-all"
                >
                  {business.email}
                </a>
              </div>
            </div>
          )}

          {/* Website */}
          {business.website && (
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Website</p>
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-blue-600 dark:text-blue-400 hover:underline break-all"
                >
                  {business.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
              </div>
            </div>
          )}

          {/* Status */}
          {business.status && (
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">{business.status}</p>
              </div>
            </div>
          )}

          {/* Rating */}
          {business.averageRating !== undefined && business.averageRating > 0 && (
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <Star className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Rating</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {business.averageRating.toFixed(1)} / 5.0
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hours of Operation */}
      {business.hoursOfOperation && Object.keys(business.hoursOfOperation).length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            Hours of Operation
          </h2>
          <div className="space-y-2">
            {Object.entries(business.hoursOfOperation).map(([day, hours]) => (
              <div key={day} className="flex justify-between items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {day}
                </span>
                <span className="text-gray-600 dark:text-gray-400">{hours}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Location */}
      {business.address && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              Our Location
            </h2>
            <button
              onClick={openInGoogleMaps}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow-md"
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </button>
          </div>

          {/* Address Display */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Address</p>
            <p className="text-base text-gray-900 dark:text-white font-medium">{business.address}</p>
          </div>

          {/* Interactive Map Preview */}
          <div className="relative mb-6">
            <button
              onClick={openInGoogleMaps}
              className="w-full h-64 md:h-80 rounded-lg overflow-hidden relative group cursor-pointer border-2 border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300"
            >
              {/* Map-like Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              {/* Location Pin Marker */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Pin Shadow */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-black opacity-20 rounded-full blur-sm"></div>
                  {/* Pin */}
                  <div className="bg-red-500 p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  {/* Ping Animation */}
                  <div className="absolute inset-0 rounded-full bg-red-500 opacity-30 animate-ping"></div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300">
                  <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold">
                    <Navigation className="h-5 w-5" />
                    <span>View on Google Maps</span>
                  </div>
                </div>
              </div>

              {/* Corner Badge */}
              <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-md">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Click to open</span>
              </div>
            </button>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Business Hours Card */}
            {business.hoursOfOperation && Object.keys(business.hoursOfOperation).length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Business Hours</h3>
                </div>
                <div className="space-y-1">
                  {Object.entries(business.hoursOfOperation).slice(0, 2).map(([day, hours]) => (
                    <p key={day} className="text-xs text-gray-700 dark:text-gray-300">
                      <span className="font-medium capitalize">{day}:</span> {hours}
                    </p>
                  ))}
                  {Object.keys(business.hoursOfOperation).length > 2 && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      +{Object.keys(business.hoursOfOperation).length - 2} more days
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Contact Card */}
            {(business.phone || business.email) && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Contact</h3>
                </div>
                <div className="space-y-2">
                  {business.phone && (
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Phone:</span> {business.phone}
                    </p>
                  )}
                  {business.email && (
                    <p className="text-xs text-gray-700 dark:text-gray-300 truncate">
                      <span className="font-medium">Email:</span> {business.email}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Website Card */}
            {business.website && (
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Website</h3>
                </div>
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-600 dark:text-purple-400 hover:underline break-all font-medium"
                >
                  Visit Website →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
