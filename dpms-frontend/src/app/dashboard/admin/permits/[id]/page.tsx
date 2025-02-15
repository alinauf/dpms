'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Permit } from '@/lib/permit/types'
import { PermitCard } from '@/components/permit-card'
import { Button } from '@/components/ui/button'
import { getPermit } from '@/lib/permit'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

interface PermitPageProps {
  params: Promise<{
    id: string
  }>
}

export default function AdminPermitPage({ params }: PermitPageProps) {
  const router = useRouter()
  const { id } = React.use(params)
  const [permit, setPermit] = useState<Permit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchPermit = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await getPermit(id)
        console.log('Permit Response:', response)

        if (!response.data) {
          throw new Error('Permit not found')
        }

        setPermit(response.data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
          toast.error(err.message)
        } else {
          setError('Failed to load permit')
          toast.error('Failed to load permit')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPermit()

    return () => {
      controller.abort()
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

  if (error || !permit) {
    return (
      <div className='h-[80vh] flex items-center justify-center'>
        <div className='text-center space-y-4 p-6'>
          <h2 className='text-2xl font-bold text-muted-foreground'>
            {error || 'Permit Not Found'}
          </h2>
          <p className='text-sm text-muted-foreground max-w-md mx-auto'>
            We couldn&apos;t find the permit you&apos;re looking for. It may
            have been deleted or you may have insufficient permissions.
          </p>
          <Button onClick={() => router.back()} className='mt-4'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Permits
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='flex items-center justify-between p-6 border-b'>
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
              <h1 className='text-2xl font-bold tracking-tight'>
                Permit Details
              </h1>
              <p className='text-sm text-muted-foreground'>
                Created on {new Date(permit.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='p-6'>
        <PermitCard permit={permit} />
      </div>
    </div>
  )
}
