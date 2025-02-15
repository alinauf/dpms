'use client'

import { useEffect, useState } from 'react'
import { Permit } from '@/lib/permit/types'
import { PermitsTable } from '@/components/permits-table'
import { Button } from '@/components/ui/button'
import { getPermits } from '@/lib/permit'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function StaffPermitsPage() {
  const router = useRouter()
  const [permits, setPermits] = useState<Permit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const fetchPermits = async () => {
      try {
        setIsLoading(true)
        const response = await getPermits(currentPage)

        if (!response.data) {
          throw new Error('No permits found')
        }

        setPermits(response.data)
        setTotalPages(response.meta.last_page)
        setTotalItems(response.meta.total)
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message)
        } else {
          toast.error('Failed to fetch permits')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPermits()

    return () => {
      controller.abort()
    }
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
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
                Active Permits
              </h1>
              <p className='text-sm text-muted-foreground'>
                Showing {permits.length} of {totalItems} permits
              </p>
            </div>
          </div>
        </div>
      </div>

      <PermitsTable
        permits={permits}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  )
}
