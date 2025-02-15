import api, { ApiResponse } from '../api'
import { PaginatedData, Permit, PermitApplication } from './types'

export const getPermitApplications = async (page: number = 1) => {
  const response = await api.post<
    ApiResponse<PaginatedData<PermitApplication>>
  >(`/api/permit/applications?page=${page}`)
  return {
    data: response.data.data.data, // The actual array of applications
    meta: {
      current_page: response.data.data.current_page,
      last_page: response.data.data.last_page,
      total: response.data.data.total,
      per_page: response.data.data.per_page,
    },
  }
}

export async function getPermitApplication(id: string) {
  const response = await api.post<ApiResponse<PermitApplication>>(
    `/api/permit/applications/${id}`
  )
  return response.data
}

export async function updatePermitApplication({
  id,
  is_approved,
}: {
  id: number
  is_approved: boolean
}) {
  const response = await api.post<ApiResponse<PermitApplication>>(
    `/api/permit/applications/update/${id}`,
    {
      is_approved,
    }
  )
  return response.data
}

// get all permits
export const getPermits = async (page: number = 1) => {
  const response = await api.post<ApiResponse<PaginatedData<Permit>>>(
    `/api/permits?page=${page}`
  )
  return {
    data: response.data.data.data,
    meta: {
      current_page: response.data.data.current_page,
      last_page: response.data.data.last_page,
      total: response.data.data.total,
      per_page: response.data.data.per_page,
    },
  }
}

export async function getPermit(id: string | number) {
  const response = await api.post<ApiResponse<Permit>>(`/api/permits/${id}`)
  return response.data
}
