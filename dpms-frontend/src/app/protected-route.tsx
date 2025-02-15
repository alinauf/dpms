'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/auth.store'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    // If not authenticated and not on auth pages, redirect to login
    if (!isAuthenticated && !pathname.startsWith('/auth')) {
      router.push('/auth/login')
    }

    // If authenticated and on auth pages, redirect to dashboard
    if (isAuthenticated && pathname.startsWith('/auth')) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, pathname, router])

  // Show children only if authenticated or on auth pages
  if (!isAuthenticated && !pathname.startsWith('/auth')) {
    return null
  }

  return <>{children}</>
}
