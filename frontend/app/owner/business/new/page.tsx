'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { withAuth } from '@/lib/auth'
import { businessAPI, fileAPI } from '@/lib/api'
import { Role } from '@/types'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import Link from 'next/link'

function NewBusinessPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    shortName: '',
    longName: '',
    description: '',
    service: '',
    businessActorId: '',
    isIndividualBusiness: false,
    address: '',
    phone: '',
    website: '',
    email: '',
    category: '',
    yearFounded: '',
    numberOfEmployees: '',
    status: '',
    logoUrl: '',
    coverImageUrl: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file for the logo')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Logo file size must be less than 5MB')
        return
      }
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError('')
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file for the cover')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Cover image file size must be less than 5MB')
        return
      }
      setCoverFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError('')
    }
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview('')
    setFormData({ ...formData, logoUrl: '' })
  }

  const removeCover = () => {
    setCoverFile(null)
    setCoverPreview('')
    setFormData({ ...formData, coverImageUrl: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Upload images first if files are selected
      let uploadedLogoUrl = formData.logoUrl
      let uploadedCoverUrl = formData.coverImageUrl

      if (logoFile) {
        setUploading(true)
        try {
          const logoResponse = await fileAPI.uploadImage(logoFile)
          uploadedLogoUrl = logoResponse.url
        } catch (err: any) {
          throw new Error(`Failed to upload logo: ${err.message}`)
        } finally {
          setUploading(false)
        }
      }

      if (coverFile) {
        setUploading(true)
        try {
          const coverResponse = await fileAPI.uploadImage(coverFile)
          uploadedCoverUrl = coverResponse.url
        } catch (err: any) {
          throw new Error(`Failed to upload cover image: ${err.message}`)
        } finally {
          setUploading(false)
        }
      }

      // Remove empty strings and replace with null or undefined
      const cleanedData = {
        name: formData.name,
        code: formData.code || undefined,
        shortName: formData.shortName || undefined,
        longName: formData.longName || undefined,
        description: formData.description || undefined,
        service: formData.service || undefined,
        businessActorId: formData.businessActorId || undefined,
        isIndividualBusiness: formData.isIndividualBusiness,
        address: formData.address || undefined,
        phone: formData.phone || undefined,
        website: formData.website || undefined,
        email: formData.email || undefined,
        category: formData.category || undefined,
        yearFounded: formData.yearFounded ? Number(formData.yearFounded) : undefined,
        numberOfEmployees: formData.numberOfEmployees ? Number(formData.numberOfEmployees) : undefined,
        status: formData.status || undefined,
        logoUrl: uploadedLogoUrl || undefined,
        coverImageUrl: uploadedCoverUrl || undefined,
      }

      const createdBusiness = await businessAPI.create(cleanedData)
      console.log('Business created successfully:', createdBusiness)
      router.push('/owner/dashboard')
    } catch (err: any) {
      console.error('Error creating business:', err)
      setError(err.response?.data?.message || err.message || 'Failed to create business')
    } finally {
      setLoading(false)
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Business</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Business Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Business Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., BUS001"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
                />
              </div>

              <div>
                <label htmlFor="shortName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Short Name
                </label>
                <input
                  type="text"
                  id="shortName"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
                />
              </div>

              <div>
                <label htmlFor="longName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Long Name
                </label>
                <input
                  type="text"
                  id="longName"
                  name="longName"
                  value={formData.longName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base cursor-pointer"
              >
                <option value="">Select a category</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Retail">Retail</option>
                <option value="Services">Services</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Service/Industry
                </label>
                <input
                  type="text"
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="e.g., Consulting, Retail, etc."
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
                />
              </div>

              <div>
                <label htmlFor="businessActorId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Business Actor ID
                </label>
                <input
                  type="text"
                  id="businessActorId"
                  name="businessActorId"
                  value={formData.businessActorId}
                  onChange={handleChange}
                  placeholder="Optional identifier"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="yearFounded" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Year Founded
                </label>
                <input
                  type="number"
                  id="yearFounded"
                  name="yearFounded"
                  value={formData.yearFounded}
                  onChange={handleChange}
                  placeholder="e.g., 2020"
                  min="1800"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
                />
              </div>

              <div>
                <label htmlFor="numberOfEmployees" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Employees
                </label>
                <input
                  type="number"
                  id="numberOfEmployees"
                  name="numberOfEmployees"
                  value={formData.numberOfEmployees}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                  min="0"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base cursor-pointer"
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Verified">Verified</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isIndividualBusiness"
                name="isIndividualBusiness"
                checked={formData.isIndividualBusiness}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="isIndividualBusiness" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                This is an individual business (sole proprietorship)
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base caret-blue-600 dark:caret-blue-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Logo Image
                </label>
                {!logoPreview ? (
                  <label
                    htmlFor="logo-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors bg-gray-50 dark:bg-gray-700/50"
                  >
                    <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Click to upload logo</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Max 5MB</span>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative w-full h-32 border-2 border-primary-300 dark:border-primary-600 rounded-lg overflow-hidden group">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-contain bg-gray-50 dark:bg-gray-700"
                    />
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Image (Banner)
                </label>
                {!coverPreview ? (
                  <label
                    htmlFor="cover-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors bg-gray-50 dark:bg-gray-700/50"
                  >
                    <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Click to upload banner</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Max 5MB</span>
                    <input
                      id="cover-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative w-full h-32 border-2 border-primary-300 dark:border-primary-600 rounded-lg overflow-hidden group">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-full h-full object-cover bg-gray-50 dark:bg-gray-700"
                    />
                    <button
                      type="button"
                      onClick={removeCover}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
              <button
                type="submit"
                disabled={loading || uploading}
                className="flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl disabled:cursor-not-allowed transition-all duration-200 min-w-[200px]"
              >
                <Save className="h-5 w-5" />
                <span>
                  {uploading ? 'Uploading images...' : loading ? 'Creating...' : 'Create Business'}
                </span>
              </button>
              <Link
                href="/owner/dashboard"
                className="px-8 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-semibold transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withAuth(NewBusinessPage, Role.BUSINESS_OWNER)
