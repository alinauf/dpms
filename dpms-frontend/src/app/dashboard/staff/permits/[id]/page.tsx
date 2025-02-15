'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Permit } from '@/lib/permit/types'
import { getPermit } from '@/lib/permit'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, BadgeCheck, Calendar, Shield, User2 } from 'lucide-react'
import { useProfile } from '@/hooks/use-profile'
import { PermitQRCode } from '@/components/permit-qr-code'
import React from 'react'

interface PermitPageProps {
  params: Promise<{
    id: string
  }>
}

export default function PermitPage({ params }: PermitPageProps) {
  const router = useRouter()
  const profile = useProfile()
  const [permit, setPermit] = useState<Permit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const resolvedParams = React.use(params)

  useEffect(() => {
    if (profile.role !== 'staff') {
      toast.error('Unauthorized access')
      router.push('/dashboard')
      return
    }

    const fetchPermit = async () => {
      try {
        setIsLoading(true)
        const response = await getPermit(resolvedParams.id)
        setPermit(response.data)
      } catch (error) {
        toast.error('Failed to fetch permit details')
        router.push('/dashboard/staff/permits')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPermit()
  }, [resolvedParams.id, profile.role, router])

  if (isLoading) {
    return (
      <div className='container max-w-3xl mx-auto p-6 space-y-8'>
        <div className='animate-pulse space-y-6'>
          <div className='h-8 w-64 bg-muted rounded'></div>
          <div className='h-[400px] w-full bg-muted rounded-lg'></div>
        </div>
      </div>
    )
  }

  if (!permit) return null

  return (
    <div className='container max-w-5xl mx-auto p-6 space-y-8'>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.back()}
          className='rounded-full'
        >
          <ArrowLeft className='h-5 w-5' />
        </Button>
        <div>
          <h1 className='text-2xl font-bold'>Permit Details</h1>
          <p className='text-sm text-muted-foreground'>
            View your permit information and QR code
          </p>
        </div>
      </div>

      <div className='grid gap-8 lg:grid-cols-2'>
        <Card className='flex flex-col h-full'>
          <CardHeader className='pb-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <CardTitle>Permit Information</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  Details about your permit
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  permit.is_expired
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}
              >
                {permit.is_expired ? 'Expired' : 'Active'}
              </span>
            </div>
          </CardHeader>
          <CardContent className='grid gap-8 flex-1'>
            <div className='flex items-start gap-4'>
              <BadgeCheck className='h-5 w-5 mt-1 text-primary' />
              <div className='space-y-1'>
                <p className='font-medium'>Permit Number</p>
                <p className='text-muted-foreground'>{permit.permit_number}</p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <Shield className='h-5 w-5 mt-1 text-primary' />
              <div className='space-y-1'>
                <p className='font-medium'>Permit Type</p>
                <p className='text-muted-foreground'>
                  {permit.permit_type.name} (Rank: {permit.permit_type.rank})
                </p>
                <p className='text-sm text-muted-foreground'>
                  {permit.permit_type.description}
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <User2 className='h-5 w-5 mt-1 text-primary' />
              <div className='space-y-1'>
                <p className='font-medium'>Permit Holder</p>
                <p className='text-muted-foreground'>
                  {permit.user.first_name} {permit.user.last_name}
                </p>
                <div className='text-sm text-muted-foreground space-y-0.5'>
                  <p>Employee ID: {permit.user.employee_id}</p>
                  <p>Department: {permit.user.department}</p>
                </div>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <Calendar className='h-5 w-5 mt-1 text-primary' />
              <div className='space-y-1'>
                <p className='font-medium'>Validity Period</p>
                <div className='text-muted-foreground space-y-0.5'>
                  <p>From: {new Date(permit.valid_from).toLocaleDateString()}</p>
                  <p>Until: {new Date(permit.valid_until).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='flex flex-col h-full'>
          <CardHeader className='pb-4'>
            <div className='space-y-1'>
              <CardTitle>QR Code</CardTitle>
              <p className='text-sm text-muted-foreground'>
                For security verification
              </p>
            </div>
          </CardHeader>
          <CardContent className='flex flex-col items-center justify-center flex-1 p-8 space-y-6'>
            <div className='bg-white p-6 rounded-lg'>
              <PermitQRCode permitNumber={permit.permit_number} />
            </div>
            <div className='text-center space-y-2'>
              <p className='text-sm text-muted-foreground'>
                Show this QR code to security personnel for verification
              </p>
              <div className='flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium'>
                <span>Permit Number:</span>
                <span className='font-mono bg-muted px-2 py-1 rounded'>
                  {permit.permit_number}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
