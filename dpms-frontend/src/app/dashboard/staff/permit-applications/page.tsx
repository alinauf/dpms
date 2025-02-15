'use client'

import { getPermitApplications } from '@/lib/permit'
import { PermitApplication } from '@/lib/permit/types'
import { useEffect, useState } from 'react'
import { PermitApplicationsTable } from '@/components/permit-applications-table'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PermitApplicationsPage() {
  const router = useRouter()
  const [permitApplications, setPermitApplications] = useState<
    PermitApplication[]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const fetchPermitApplications = async () => {
      try {
        setIsLoading(true)
        const response = await getPermitApplications(currentPage)
        setPermitApplications(response.data)
        setTotalPages(response.meta.last_page)
        setTotalItems(response.meta.total)
      } catch {
        toast.error('Failed to fetch permit applications')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPermitApplications()
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
                Permit Applications
              </h1>
              <p className='text-sm text-muted-foreground'>
                Showing {permitApplications.length} of {totalItems} applications
              </p>
            </div>
          </div>
        </div>
      </div>

      <PermitApplicationsTable
        applications={permitApplications}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  )
}
