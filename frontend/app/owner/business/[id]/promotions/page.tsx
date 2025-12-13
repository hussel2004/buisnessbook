'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { withAuth } from '@/lib/auth'
import { promotionAPI, businessAPI } from '@/lib/api'
import { Role } from '@/types'
import type { Promotion, Business } from '@/types'
import { ArrowLeft, Plus, Edit, Trash2, Tag, Calendar } from 'lucide-react'
import Link from 'next/link'

function PromotionsManagementPage() {
  const router = useRouter()
  const params = useParams()
  const businessId = Number(params.id)

  const [business, setBusiness] = useState<Business | null>(null)
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountPercentage: '',
    promoCode: '',
    expiryDate: '',
    isActive: true,
  })

  useEffect(() => {
    loadData()
  }, [businessId])

  const loadData = async () => {
    try {
      setLoading(true)
      const [businessData, promotionsData] = await Promise.all([
        businessAPI.getById(businessId),
        promotionAPI.getByBusiness(businessId),
      ])
      setBusiness(businessData)
      setPromotions(promotionsData)
    } catch (error: any) {
      console.error('Error loading data:', error)
      alert(error.response?.data?.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (promotion?: Promotion) => {
    if (promotion) {
      setEditingPromotion(promotion)
      setFormData({
        title: promotion.title,
        description: promotion.description || '',
        discountPercentage: promotion.discountPercentage?.toString() || '',
        promoCode: promotion.promoCode || '',
        expiryDate: promotion.expiryDate
          ? new Date(promotion.expiryDate).toISOString().split('T')[0]
          : '',
        isActive: promotion.isActive,
      })
    } else {
      setEditingPromotion(null)
      setFormData({
        title: '',
        description: '',
        discountPercentage: '',
        promoCode: '',
        expiryDate: '',
        isActive: true,
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingPromotion(null)
    setFormData({
      title: '',
      description: '',
      discountPercentage: '',
      promoCode: '',
      expiryDate: '',
      isActive: true,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const promotionData = {
        title: formData.title,
        description: formData.description || undefined,
        discountPercentage: formData.discountPercentage
          ? Number(formData.discountPercentage)
          : undefined,
        promoCode: formData.promoCode || undefined,
        expiryDate: formData.expiryDate || undefined,
        isActive: formData.isActive,
        businessId,
      }

      if (editingPromotion) {
        await promotionAPI.update(editingPromotion.id, promotionData)
      } else {
        await promotionAPI.create(promotionData)
      }

      handleCloseModal()
      loadData()
    } catch (error: any) {
      console.error('Error saving promotion:', error)
      alert(error.response?.data?.message || 'Failed to save promotion')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this promotion?')) return

    try {
      await promotionAPI.delete(id)
      setPromotions(promotions.filter((p) => p.id !== id))
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to delete promotion')
    }
  }

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/owner/dashboard"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Manage Promotions
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{business?.name}</p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm"
            >
              <Plus className="h-5 w-5" />
              <span>New Promotion</span>
            </button>
          </div>

          {promotions.length > 0 ? (
            <div className="space-y-4">
              {promotions.map((promotion) => {
                const expired = isExpired(promotion.expiryDate)
                return (
                  <div
                    key={promotion.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {promotion.title}
                          </h3>
                          {promotion.discountPercentage && (
                            <span className="px-2 py-1 text-xs font-bold bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">
                              {promotion.discountPercentage}% OFF
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              expired
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                : promotion.isActive
                                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200'
                            }`}
                          >
                            {expired ? 'Expired' : promotion.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        {promotion.description && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                            {promotion.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          {promotion.promoCode && (
                            <div className="flex items-center space-x-1">
                              <Tag className="h-4 w-4" />
                              <span className="font-mono font-semibold">{promotion.promoCode}</span>
                            </div>
                          )}
                          {promotion.expiryDate && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Expires: {new Date(promotion.expiryDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleOpenModal(promotion)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(promotion.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No promotions yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your first promotion to attract more customers
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm"
              >
                <Plus className="h-5 w-5" />
                <span>Create First Promotion</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {editingPromotion ? 'Edit Promotion' : 'Create New Promotion'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="discountPercentage"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Discount Percentage
                    </label>
                    <input
                      type="number"
                      id="discountPercentage"
                      name="discountPercentage"
                      min="0"
                      max="100"
                      value={formData.discountPercentage}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="promoCode"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Promo Code
                    </label>
                    <input
                      type="text"
                      id="promoCode"
                      name="promoCode"
                      value={formData.promoCode}
                      onChange={handleChange}
                      placeholder="e.g., SAVE20"
                      className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isActive"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Make promotion active immediately
                  </label>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm"
                  >
                    {editingPromotion ? 'Update Promotion' : 'Create Promotion'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default withAuth(PromotionsManagementPage, Role.BUSINESS_OWNER)
