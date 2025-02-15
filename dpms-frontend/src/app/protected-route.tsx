'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/auth.store'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuthStore()

  // Add public routes that don't need authentication
  const publicRoutes = ['/auth', '/verify-permit']

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  useEffect(() => {
    // If not authenticated and not on public routes, redirect to login
    if (!isAuthenticated && !isPublicRoute) {
      router.push('/auth/login')
    }

    // If authenticated and on auth pages, redirect to dashboard
    if (isAuthenticated && pathname.startsWith('/auth')) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, pathname, router, isPublicRoute])

  // Show children if authenticated or on public routes
  if (!isAuthenticated && !isPublicRoute) {
    return null
  }

  return <>{children}</>
}
