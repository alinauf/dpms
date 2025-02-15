'use client'

import { UserNav } from '@/components/user-nav'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/app/theme-toggle'

export function MainNav() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center'>
        <div className='mr-4 hidden md:flex'>
          <h2 className='text-lg font-semibold'>
            Digital Permit Management System
          </h2>
        </div>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <ThemeToggle />
          <Separator orientation='vertical' className='h-6' />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
