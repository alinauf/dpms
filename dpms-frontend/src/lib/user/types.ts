export type UserRole = 'admin' | 'staff' | 'security'
export type Department =
  | 'IT'
  | 'HR'
  | 'Finance'
  | 'Marketing'
  | 'Sales'
  | 'Engineering'
  | 'Operations'
  | 'Customer Support'

export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  employee_id: string
  department: Department
  role: UserRole
}
