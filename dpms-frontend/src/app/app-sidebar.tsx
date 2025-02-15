'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'
import {
  HomeIcon,
  FileTextIcon,
  UsersIcon,
  ShieldCheckIcon,
  SettingsIcon,
  LogOutIcon,
} from 'lucide-react'
import Image from 'next/image'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='border-b p-4'>
        <div className='flex items-center gap-2'>
          <Image
            src='/logo_white.png'
            alt='MACL Logo'
            className='h-6 w-auto'
            width={24}
            height={24}
          />
          <span className='font-semibold'>DPMS</span>
        </div>
      </SidebarHeader>
      <SidebarContent className='p-4'>
        <div className='flex flex-col gap-2'>
          <Button variant='ghost' className='w-full justify-start gap-2'>
            <HomeIcon className='h-4 w-4' />
            Dashboard
          </Button>
          <Button variant='ghost' className='w-full justify-start gap-2'>
            <FileTextIcon className='h-4 w-4' />
            Permits
          </Button>
          <Button variant='ghost' className='w-full justify-start gap-2'>
            <UsersIcon className='h-4 w-4' />
            Staff
          </Button>
          <Button variant='ghost' className='w-full justify-start gap-2'>
            <ShieldCheckIcon className='h-4 w-4' />
            Security
          </Button>
        </div>
      </SidebarContent>
      <SidebarFooter className='border-t p-4'>
        <div className='flex flex-col gap-2'>
          <Button variant='ghost' className='w-full justify-start gap-2'>
            <SettingsIcon className='h-4 w-4' />
            Settings
          </Button>
          <Button
            variant='ghost'
            className='w-full justify-start gap-2 text-red-500'
          >
            <LogOutIcon className='h-4 w-4' />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
