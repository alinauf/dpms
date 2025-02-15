import { useAuthStore } from '@/lib/auth.store'

export const useProfile = () => {
  const { user } = useAuthStore()
  return user
}
