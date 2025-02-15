'use client'

import { useEffect, useState } from 'react'
import { Permit } from '@/lib/permit/types'
import { getPermit } from '@/lib/permit'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertCircle,
  BadgeCheck,
  Calendar,
  Shield,
  User2,
  Lock,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/hooks/use-profile'

interface PermitVerificationProps {
  permitId: string
}

export function PermitVerification({ permitId }: PermitVerificationProps) {
  const router = useRouter()
  const user = useProfile()
  const [permit, setPermit] = useState<Permit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const canVerify = user && ['security', 'admin'].includes(user.role)

  useEffect(() => {
    const fetchPermit = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Check if user can verify permits
        if (!canVerify) {
          throw new Error(
            'Unauthorized: Only security officers and administrators can verify permits'
          )
        }

        const response = await getPermit(permitId)

        if (!response.data) {
          throw new Error('Permit not found')
        }

        setPermit(response.data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
          toast.error(err.message)
        } else {
          setError('Failed to verify permit')
          toast.error('Failed to verify permit')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPermit()
  }, [permitId, canVerify])

  if (!canVerify) {
    return (
      <Card>
        <CardContent className='p-6 space-y-4'>
          <div className='flex items-center gap-2 text-destructive'>
            <Lock className='h-5 w-5' />
            <h2 className='text-lg font-semibold'>Access Denied</h2>
          </div>
          <p className='text-muted-foreground'>
            Only security officers and administrators can verify permits.
          </p>
          <Button onClick={() => router.push('/auth/login')}>
            Login with Security Account
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <div className='animate-pulse space-y-6'>
        <div className='h-8 w-64 bg-muted rounded'></div>
        <div className='h-[400px] w-full bg-muted rounded-lg'></div>
      </div>
    )
  }

  if (error || !permit) {
    return (
      <div className='space-y-4'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'Failed to verify permit'}
          </AlertDescription>
        </Alert>

        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className='p-6 space-y-8'>
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold'>Permit Verification</h1>
          <div className='flex items-center gap-2'>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                permit.is_expired
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}
            >
              {permit.is_expired ? 'Expired' : 'Active'}
            </span>
          </div>
        </div>

        <div className='grid gap-6'>
          <div className='flex items-start gap-3'>
            <BadgeCheck className='h-5 w-5 mt-1 text-primary' />
            <div>
              <p className='font-medium'>Permit Number</p>
              <p className='text-muted-foreground'>{permit.permit_number}</p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <Shield className='h-5 w-5 mt-1 text-primary' />
            <div>
              <p className='font-medium'>Permit Type</p>
              <p className='text-muted-foreground'>
                {permit.permit_type.name} (Rank: {permit.permit_type.rank})
              </p>
              <p className='text-sm text-muted-foreground mt-1'>
                {permit.permit_type.description}
              </p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <User2 className='h-5 w-5 mt-1 text-primary' />
            <div>
              <p className='font-medium'>Permit Holder</p>
              <p className='text-muted-foreground'>
                {permit.user.first_name} {permit.user.last_name}
              </p>
              <p className='text-sm text-muted-foreground'>
                Employee ID: {permit.user.employee_id}
              </p>
              <p className='text-sm text-muted-foreground'>
                Department: {permit.user.department}
              </p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <Calendar className='h-5 w-5 mt-1 text-primary' />
            <div>
              <p className='font-medium'>Validity Period</p>
              <p className='text-muted-foreground'>
                From: {new Date(permit.valid_from).toLocaleDateString()}
              </p>
              <p className='text-muted-foreground'>
                Until: {new Date(permit.valid_until).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
