import api, { ApiResponse } from '../api'
import { PermitApplication, PermitApplicationsResponse } from './types'

export const getPermitApplications = async (page: number = 1) => {
  const response = await api.post<PermitApplicationsResponse>(
    `/api/permit/applications?page=${page}`
  )
  return response.data
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
