'use client'

import React from 'react'
import {
  FileText,
  Plus,
  ClipboardList,
  Users,
  Settings,
  BadgeCheck,
} from 'lucide-react'
import Link from 'next/link'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useProfile } from '@/hooks/use-profile'
import { User } from '@/lib/user/types'

export default function DashboardPage(): React.JSX.Element {
  const profile = useProfile()

  if (!profile) {
    return <div>Loading...</div>
  }

  const role = profile.role

  if (role === 'staff') {
    return <StaffDashboard profile={profile} />
  }

  if (role === 'admin') {
    return <AdminDashboard profile={profile} />
  }

  return <div>Invalid role</div>

  //TODO: ADD Security Role
}

const AdminDashboard = ({ profile }: { profile: User }) => {
  return (
    <div className='container mx-auto p-6'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold tracking-tight dark:text-white'>
          Hello {profile.first_name}
        </h2>
        <p className='text-muted-foreground mt-2'>
          Manage permit applications, users, and system settings
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        <Link href='/dashboard/admin/permit-applications' className='group'>
          <Card className='border-none shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800/40'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 p-6'>
              <div className='space-y-2'>
                <CardTitle className='text-xl font-semibold group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400 transition-colors'>
                  Permit Applications
                </CardTitle>
                <CardDescription className='text-sm text-muted-foreground dark:text-gray-400'>
                  Review and manage all permit applications
                </CardDescription>
              </div>
              <div className='h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center group-hover:scale-110 transition-transform'>
                <FileText className='h-6 w-6 text-blue-600 dark:text-blue-400' />
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href='/dashboard/admin/permits' className='group'>
          <Card className='border-none shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800/40'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 p-6'>
              <div className='space-y-2'>
                <CardTitle className='text-xl font-semibold group-hover:text-green-600 dark:text-gray-100 dark:group-hover:text-green-400 transition-colors'>
                  Active Permits
                </CardTitle>
                <CardDescription className='text-sm text-muted-foreground dark:text-gray-400'>
                  View and manage all active permits
                </CardDescription>
              </div>
              <div className='h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center group-hover:scale-110 transition-transform'>
                <BadgeCheck className='h-6 w-6 text-green-600 dark:text-green-400' />
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}

const StaffDashboard = ({ profile }: { profile: User }) => {
  return (
    <div className='container mx-auto p-6'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold tracking-tight dark:text-white'>
          Hello {profile.first_name}
        </h2>
        <p className='text-muted-foreground mt-2'>
          View permit applications, permits and request new permits
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        <Link href='/dashboard/staff/permit-applications' className='group'>
          <Card className='border-none shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800/40'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 p-6'>
              <div className='space-y-2'>
                <CardTitle className='text-xl font-semibold group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400 transition-colors'>
                  Permit Applications
                </CardTitle>
                <CardDescription className='text-sm text-muted-foreground dark:text-gray-400'>
                  View all your permit applications and their status
                </CardDescription>
              </div>
              <div className='h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center group-hover:scale-110 transition-transform'>
                <FileText className='h-6 w-6 text-blue-600 dark:text-blue-400' />
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href='/dashboard/staff/permits/request' className='group'>
          <Card className='border-none shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800/40'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 p-6'>
              <div className='space-y-2'>
                <CardTitle className='text-xl font-semibold group-hover:text-green-600 dark:text-gray-100 dark:group-hover:text-green-400 transition-colors'>
                  Request Permit
                </CardTitle>
                <CardDescription className='text-sm text-muted-foreground dark:text-gray-400'>
                  Submit a new permit request for airport access
                </CardDescription>
              </div>
              <div className='h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center group-hover:scale-110 transition-transform'>
                <Plus className='h-6 w-6 text-green-600 dark:text-green-400' />
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href='/dashboard/staff/permits' className='group'>
          <Card className='border-none shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800/40'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 p-6'>
              <div className='space-y-2'>
                <CardTitle className='text-xl font-semibold group-hover:text-purple-600 dark:text-gray-100 dark:group-hover:text-purple-400 transition-colors'>
                  Active Permits
                </CardTitle>
                <CardDescription className='text-sm text-muted-foreground dark:text-gray-400'>
                  View and manage your active airport permits
                </CardDescription>
              </div>
              <div className='h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center group-hover:scale-110 transition-transform'>
                <ClipboardList className='h-6 w-6 text-purple-600 dark:text-purple-400' />
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}
