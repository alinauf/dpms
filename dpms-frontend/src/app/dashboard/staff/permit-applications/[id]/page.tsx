'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PermitApplication } from '@/lib/permit/types'
import { PermitApplicationCard } from '@/components/permit-application-card'
import { Button } from '@/components/ui/button'
import { getPermitApplication } from '@/lib/permit'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

interface PermitApplicationPageProps {
  params: Promise<{
    id: string
  }>
}

export default function PermitApplicationPage({
  params,
}: PermitApplicationPageProps) {
  const router = useRouter()
  const { id } = React.use(params)
  const [application, setApplication] = useState<PermitApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchApplication = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await getPermitApplication(id)

        if (!isMounted) return

        if (!response.data) {
          throw new Error('Permit application not found')
        }

        setApplication(response.data)
      } catch (err) {
        if (!isMounted) return

        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to load permit application'

        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchApplication()

    return () => {
      isMounted = false
    }
  }, [id])

  if (isLoading) {
    return (
      <div className='p-8'>
        <div className='animate-pulse space-y-6 max-w-3xl mx-auto'>
          <div className='flex items-center gap-4'>
            <div className='h-10 w-10 rounded-full bg-muted'></div>
            <div className='h-8 w-64 bg-muted rounded'></div>
          </div>
          <div className='h-[500px] w-full bg-muted rounded-lg'></div>
        </div>
      </div>
    )
  }

  if (error || !application) {
    return (
      <div className='h-[80vh] flex items-center justify-center'>
        <div className='text-center space-y-4 p-6'>
          <h2 className='text-2xl font-bold text-muted-foreground'>
            {error || 'Permit Application Not Found'}
          </h2>
          <p className='text-sm text-muted-foreground max-w-md mx-auto'>
            We couldn't find the permit application you're looking for. It may
            have been deleted or you may have insufficient permissions.
          </p>
          <Button onClick={() => router.back()} className='mt-4'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Applications
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='flex items-center gap-4 p-6 border-b'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => router.back()}
            className='rounded-full'
          >
            <ArrowLeft className='h-5 w-5' />
          </Button>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Permit Application Details
            </h1>
            <p className='text-sm text-muted-foreground'>
              Submitted on{' '}
              {new Date(application.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className='p-6'>
        <PermitApplicationCard application={application} />
      </div>
    </div>
  )
}
