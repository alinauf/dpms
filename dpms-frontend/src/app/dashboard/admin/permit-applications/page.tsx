'use client'

import { useEffect, useState } from 'react'
import { PermitApplication } from '@/lib/permit/types'
import { PermitApplicationsTable } from '@/components/permit-applications-table'
import { Button } from '@/components/ui/button'
import { getPermitApplications } from '@/lib/permit'
import { Download } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminPermitApplicationsPage() {
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
      } catch (error) {
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

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export clicked')
  }

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            All Permit Applications
          </h1>
          <p className='text-sm text-muted-foreground mt-1'>
            Showing {permitApplications.length} of {totalItems} applications
          </p>
        </div>
        <Button onClick={handleExport} className='gap-2'>
          <Download className='h-4 w-4' />
          Export
        </Button>
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