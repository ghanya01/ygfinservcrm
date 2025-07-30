export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'MANAGER' | 'AGENT' | 'VIEWER'
  phone?: string
  avatar?: string
  isActive: boolean
  createdAt: string
  updatedAt?: string
}

export interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  alternatePhone?: string
  dateOfBirth?: string
  clientType: 'INDIVIDUAL' | 'CORPORATE' | 'TRUST' | 'PARTNERSHIP'
  address?: string
  city?: string
  state?: string
  pincode?: string
  country?: string
  occupation?: string
  company?: string
  annualIncome?: number
  panNumber?: string
  aadharNumber?: string
  bankAccount?: string
  ifscCode?: string
  source?: string
  tags: string[]
  notes?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  userId: string
  user?: {
    firstName: string
    lastName: string
  }
}

export interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
  jobTitle?: string
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST'
  source?: string
  value?: number
  probability?: number
  expectedCloseDate?: string
  address?: string
  city?: string
  state?: string
  country?: string
  notes?: string
  tags: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  userId: string
  assignedToId?: string
  clientId?: string
  user?: {
    firstName: string
    lastName: string
  }
  assignedTo?: {
    firstName: string
    lastName: string
  }
}

export interface Deal {
  id: string
  title: string
  description?: string
  stage: 'PROSPECTING' | 'QUALIFICATION' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSING' | 'WON' | 'LOST'
  value: number
  probability: number
  expectedCloseDate?: string
  actualCloseDate?: string
  investmentType?: 'MUTUAL_FUNDS' | 'STOCKS' | 'BONDS' | 'INSURANCE' | 'FIXED_DEPOSITS' | 'REAL_ESTATE' | 'COMMODITIES'
  products: string[]
  commission?: number
  notes?: string
  tags: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  userId: string
  assignedToId?: string
  clientId: string
  leadId?: string
  client?: {
    firstName: string
    lastName: string
  }
  user?: {
    firstName: string
    lastName: string
  }
}

export interface Activity {
  id: string
  title: string
  description?: string
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'TASK' | 'NOTE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate?: string
  completedAt?: string
  isCompleted: boolean
  notes?: string
  createdAt: string
  updatedAt: string
  userId: string
  clientId?: string
  leadId?: string
  dealId?: string
  user?: {
    firstName: string
    lastName: string
  }
  client?: {
    firstName: string
    lastName: string
  }
}

export interface Investment {
  id: string
  investmentType: 'MUTUAL_FUNDS' | 'STOCKS' | 'BONDS' | 'INSURANCE' | 'FIXED_DEPOSITS' | 'REAL_ESTATE' | 'COMMODITIES'
  productName: string
  investmentAmount: number
  currentValue?: number
  purchaseDate: string
  maturityDate?: string
  interestRate?: number
  returns?: number
  folioNumber?: string
  certificateNumber?: string
  notes?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  clientId: string
  dealId?: string
  client?: {
    firstName: string
    lastName: string
  }
}

export interface Document {
  id: string
  fileName: string
  originalName: string
  mimeType: string
  size: number
  path: string
  description?: string
  tags: string[]
  createdAt: string
  updatedAt: string
  clientId: string
  client?: {
    firstName: string
    lastName: string
  }
}

export interface DashboardStats {
  clients: number
  leads: number
  deals: number
  activities: number
}

export interface PipelineData {
  stage: string
  _count: {
    stage: number
  }
  _sum: {
    value: number
  }
}

export interface RevenueData {
  thisMonth: number
  lastMonth: number
  growth: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface RegisterRequest {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
  phone?: string
  role?: 'ADMIN' | 'MANAGER' | 'AGENT' | 'VIEWER'
}