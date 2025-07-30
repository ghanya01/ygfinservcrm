import { api } from './api'
import { LoginRequest, LoginResponse, RegisterRequest, User, ApiResponse } from '../types'

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials)
    return response.data.data
  },

  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/register', data)
    return response.data.data
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/users/profile')
    return response.data.data
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await api.post('/auth/change-password', {
      currentPassword,
      newPassword,
    })
  },

  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email })
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await api.post('/auth/reset-password', {
      token,
      newPassword,
    })
  },
}