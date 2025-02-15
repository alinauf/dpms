import api from '../api'
import { User } from '../user/types'

export type LoginResponse = {
  user: User
  token: string
  token_type: string
  role: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export const login = async ({
  email,
  password,
}: LoginCredentials): Promise<LoginResponse> => {
  console.log('login', email, password)
  const response = await api.post<LoginResponse>('/api/login', {
    email,
    password,
  })
  return response.data
}

export const logout = async () => {
  const response = await api.post('/api/logout')
  return response.data
}
