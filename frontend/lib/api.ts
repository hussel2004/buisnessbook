import axios from 'axios'
import type {
  AuthRequest,
  AuthResponse,
  RegisterRequest,
  Business,
  BusinessRequest,
  Post,
  PostRequest,
  Promotion,
  PromotionRequest,
  Comment,
  CommentRequest,
  PaginatedResponse,
} from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  register: (data: RegisterRequest) =>
    api.post<AuthResponse>('/auth/register', data).then((res) => res.data),

  login: (data: AuthRequest) =>
    api.post<AuthResponse>('/auth/login', data).then((res) => res.data),
}

// Business API
export const businessAPI = {
  getAll: (page = 0, size = 10) =>
    api
      .get<PaginatedResponse<Business>>('/businesses', { params: { page, size } })
      .then((res) => res.data),

  getById: (id: number) => api.get<Business>(`/businesses/${id}`).then((res) => res.data),

  getBySlug: (slug: string) =>
    api.get<Business>(`/businesses/slug/${slug}`).then((res) => res.data),

  search: (keyword: string, page = 0, size = 10) =>
    api
      .get<PaginatedResponse<Business>>('/businesses/search', {
        params: { keyword, page, size },
      })
      .then((res) => res.data),

  searchAdvanced: (name: string = '', location: string = '', page = 0, size = 10) =>
    api
      .get<PaginatedResponse<Business>>('/businesses/search/advanced', {
        params: { name, location, page, size },
      })
      .then((res) => res.data),

  getByCategory: (category: string, page = 0, size = 10) =>
    api
      .get<PaginatedResponse<Business>>(`/businesses/category/${category}`, {
        params: { page, size },
      })
      .then((res) => res.data),

  getPopular: (page = 0, size = 10) =>
    api
      .get<PaginatedResponse<Business>>('/businesses/popular', { params: { page, size } })
      .then((res) => res.data),

  getMyBusinesses: () => api.get<Business[]>('/businesses/my-businesses').then((res) => res.data),

  create: (data: BusinessRequest) =>
    api.post<Business>('/businesses', data).then((res) => res.data),

  update: (id: number, data: BusinessRequest) =>
    api.put<Business>(`/businesses/${id}`, data).then((res) => res.data),

  delete: (id: number) => api.delete(`/businesses/${id}`).then((res) => res.data),
}

// Post API
export const postAPI = {
  getByBusiness: (businessId: number) =>
    api.get<Post[]>(`/posts/business/${businessId}`).then((res) => res.data),

  getRecent: (page = 0, size = 10) =>
    api
      .get<PaginatedResponse<Post>>('/posts/recent', { params: { page, size } })
      .then((res) => res.data),

  getById: (id: number) => api.get<Post>(`/posts/${id}`).then((res) => res.data),

  create: (data: PostRequest) => api.post<Post>('/posts', data).then((res) => res.data),

  update: (id: number, data: PostRequest) =>
    api.put<Post>(`/posts/${id}`, data).then((res) => res.data),

  delete: (id: number) => api.delete(`/posts/${id}`).then((res) => res.data),

  like: (id: number) => api.post(`/posts/${id}/like`).then((res) => res.data),

  unlike: (id: number) => api.delete(`/posts/${id}/like`).then((res) => res.data),

  isLiked: (id: number) =>
    api.get<{ isLiked: boolean }>(`/posts/${id}/is-liked`).then((res) => res.data),
}

// Comment API
export const commentAPI = {
  getByBusiness: (businessId: number) =>
    api.get<Comment[]>(`/comments/business/${businessId}`).then((res) => res.data),

  getByPost: (postId: number) =>
    api.get<Comment[]>(`/comments/post/${postId}`).then((res) => res.data),

  create: (data: CommentRequest) => api.post<Comment>('/comments', data).then((res) => res.data),

  delete: (id: number) => api.delete(`/comments/${id}`).then((res) => res.data),
}

// Promotion API
export const promotionAPI = {
  getByBusiness: (businessId: number) =>
    api.get<Promotion[]>(`/promotions/business/${businessId}`).then((res) => res.data),

  getActive: () => api.get<Promotion[]>('/promotions/active').then((res) => res.data),

  create: (data: PromotionRequest) =>
    api.post<Promotion>('/promotions', data).then((res) => res.data),

  update: (id: number, data: PromotionRequest) =>
    api.put<Promotion>(`/promotions/${id}`, data).then((res) => res.data),

  delete: (id: number) => api.delete(`/promotions/${id}`).then((res) => res.data),
}

// Message API
export const messageAPI = {
  send: (data: { businessId: number; subject: string; content: string }) =>
    api.post('/messages', data).then((res) => res.data),

  getBusinessMessages: (businessId: number) =>
    api.get(`/messages/business/${businessId}`).then((res) => res.data),

  getSentMessages: () =>
    api.get('/messages/sent').then((res) => res.data),

  markAsRead: (id: number) =>
    api.put(`/messages/${id}/read`).then((res) => res.data),

  getUnreadCount: (businessId: number) =>
    api.get<{ count: number }>(`/messages/business/${businessId}/unread-count`).then((res) => res.data),
}

// File Upload API
export const fileAPI = {
  uploadImage: async (file: File): Promise<{ url: string; message: string }> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}

export default api
