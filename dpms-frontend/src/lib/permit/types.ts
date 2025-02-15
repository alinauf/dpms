import { ApiResponse } from '../api'
import { User } from '../user/types'

export enum PermitTypeNames {
  restricted = 'restricted',
  temporary = 'temporary',
  permanent = 'permanent',
}

export type PermitType = {
  id: number
  name: PermitTypeNames
  rank: number //higher rank means more access
  description: string | null
  requires_approval: boolean
  created_at: Date
  updated_at: Date
}

export type Permit = {
  id: number
  user_id: number
  permit_number: string
  permit_type_id: number
  valid_from: Date
  valid_until: Date
  permit_application_id: number
  is_expired: boolean
  user: User
  permit_type: PermitType
  created_at: Date
  updated_at: Date
}

// Base Permit Application type
export interface PermitApplication {
  id: number
  user_id: number
  permit_type_id: number
  valid_from: string
  valid_until: string
  approval_status: boolean | null
  approval_comment: string | null
  justification: string
  created_at: string
  updated_at: string
  permit_type: PermitType
  user: User
}

// Pagination Link type
interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

// Laravel Pagination type
export interface PaginatedData<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

// Specific type for permit applications response
export type PermitApplicationsResponse = ApiResponse<
  PaginatedData<PermitApplication>
>
