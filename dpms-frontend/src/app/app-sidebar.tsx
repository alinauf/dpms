'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useProfile } from '@/hooks/use-profile'
import { logout } from '@/lib/auth'
import { Home, FileText, Users, Shield, LogOut } from 'lucide-react'

export function AppSidebar() {
  const pathname = usePathname()
  const profile = useProfile()

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <div className='flex h-full w-56 flex-col border-r bg-background'>
      <div className='flex h-14 items-center border-b px-4'>
        <Link href='/dashboard' className='flex items-center gap-2'>
          <Image
            src='/logo.png'
            alt='MACL Logo'
            width={24}
            height={24}
            className='h-6 w-auto'
          />
          <span className='font-semibold'>DPMS</span>
        </Link>
      </div>

      <div className='flex-1 space-y-1 p-2'>
        <Link href='/dashboard'>
          <Button
            variant='ghost'
            className={cn(
              'w-full justify-start gap-2',
              isActive('/dashboard') && 'bg-muted'
            )}
          >
            <Home className='h-4 w-4' />
            Dashboard
          </Button>
        </Link>

        {profile && profile.role === 'admin' && (
          <>
            <Link href='/dashboard/admin/permits'>
              <Button
                variant='ghost'
                className={cn(
                  'w-full justify-start gap-2',
                  isActive('/dashboard/admin/permits') && 'bg-muted'
                )}
              >
                <FileText className='h-4 w-4' />
                Permits
              </Button>
            </Link>
            <Link href='/dashboard/admin/staff'>
              <Button
                variant='ghost'
                className={cn(
                  'w-full justify-start gap-2',
                  isActive('/dashboard/admin/staff') && 'bg-muted'
                )}
              >
                <Users className='h-4 w-4' />
                Staff
              </Button>
            </Link>
          </>
        )}

        {profile && profile.role === 'security' && (
          <Link href='/dashboard/security/scan'>
            <Button
              variant='ghost'
              className={cn(
                'w-full justify-start gap-2',
                isActive('/dashboard/security/scan') && 'bg-muted'
              )}
            >
              <Shield className='h-4 w-4' />
              Verify Permits
            </Button>
          </Link>
        )}
      </div>

      <div className='border-t p-2'>
        <Button
          onClick={() => logout()}
          variant='ghost'
          className='w-full justify-start gap-2 text-red-500 hover:text-red-600'
        >
          <LogOut className='h-4 w-4' />
          Logout
        </Button>
      </div>
    </div>
  )
}
