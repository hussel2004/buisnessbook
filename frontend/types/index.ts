export enum Role {
  VISITOR = 'VISITOR',
  BUSINESS_OWNER = 'BUSINESS_OWNER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number
  email: string
  firstName?: string
  lastName?: string
  role: Role
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface Business {
  id: number
  code?: string
  name: string
  shortName?: string
  longName?: string
  slug: string
  description?: string
  service?: string
  businessActorId?: string
  isIndividualBusiness?: boolean
  address?: string
  phone?: string
  website?: string
  email?: string
  category?: string
  yearFounded?: number
  numberOfEmployees?: number
  status?: string
  averageRating?: number
  logoUrl?: string
  coverImageUrl?: string
  hoursOfOperation?: Record<string, string>
  createdBy: Partial<User>
  createdAt: string
  updatedAt: string
  isActive: boolean
  viewCount: number
}

export interface Post {
  id: number
  title: string
  content: string
  imageUrl?: string
  media?: Record<string, string>
  business: Partial<Business>
  likesCount: number
  commentsCount: number
  sharesCount: number
  createdAt: string
  updatedAt: string
  isPublished: boolean
}

export interface Promotion {
  id: number
  title: string
  description?: string
  discountPercentage?: number
  promoCode?: string
  startDate?: string
  endDate?: string
  expiryDate?: string
  status?: string
  isActive: boolean
  business: Partial<Business>
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: number
  content: string
  authorAvatar?: string
  rating?: number
  likesCount?: number
  createdBy: Partial<User>
  business?: Partial<Business>
  post?: Partial<Post>
  parent?: Partial<Comment>
  replies?: Comment[]
  createdAt: string
  updatedAt: string
  isDeleted: boolean
}

export interface AuthResponse {
  token: string
  type: string
  id: number
  email: string
  firstName?: string
  lastName?: string
  role: Role
}

export interface AuthRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName?: string
  lastName?: string
  role?: Role
}

export interface BusinessRequest {
  code?: string
  name: string
  shortName?: string
  longName?: string
  description?: string
  service?: string
  businessActorId?: string
  isIndividualBusiness?: boolean
  address?: string
  phone?: string
  website?: string
  email?: string
  category?: string
  yearFounded?: number
  numberOfEmployees?: number
  status?: string
  logoUrl?: string
  coverImageUrl?: string
  hoursOfOperation?: Record<string, string>
}

export interface PostRequest {
  title: string
  content: string
  imageUrl?: string
  media?: Record<string, string>
  businessId: number
  isPublished?: boolean
}

export interface PromotionRequest {
  title: string
  description?: string
  discountPercentage?: number
  promoCode?: string
  startDate?: string
  endDate?: string
  expiryDate?: string
  status?: string
  isActive?: boolean
  businessId: number
}

export interface CommentRequest {
  content: string
  businessId?: number
  postId?: number
}

export interface Message {
  id: number
  business: Partial<Business>
  sender: Partial<User>
  senderName: string
  senderEmail: string
  subject: string
  content: string
  isRead: boolean
  createdAt: string
}

export interface MessageRequest {
  businessId: number
  subject: string
  content: string
}

export interface PaginatedResponse<T> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
  }
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  size: number
  number: number
  numberOfElements: number
  empty: boolean
}
