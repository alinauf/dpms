export enum PermitTypeNames {
  restricted = 'restricted',
  temporary = 'temporary',
  permanent = 'permanent',
}

export type PermitType = {
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
}
