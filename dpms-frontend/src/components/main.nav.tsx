'use client'

import { UserNav } from '@/components/user-nav'
import { ThemeToggle } from '@/app/theme-toggle'
import Link from 'next/link'

export function MainNav() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center'>
        <div className='mr-4 hidden md:flex'>
          <Link href='/dashboard'>
            <h2 className='text-lg font-semibold'>
              Digital Permit Management System
            </h2>
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
