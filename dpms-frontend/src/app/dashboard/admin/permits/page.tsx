'use client'

import { useEffect, useState } from 'react'
import { Permit } from '@/lib/permit/types'
import { PermitsTable } from '@/components/permits-table'
import { Button } from '@/components/ui/button'
import { getPermits } from '@/lib/permit'
import { Download, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { generatePermitsReport } from '@/lib/reports/generate-reports'

export default function AdminPermitsPage() {
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
        console.log('Permits Response:', response.data)

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

  const handleExport = () => {
    // TODO: Implement export functionality
    toast.info('Export functionality coming soon')
  }

  const handleGenerateReport = async (format: 'pdf' | 'csv') => {
    try {
      if (!permits.length) {
        toast.error('No data available for report')
        return
      }

      await generatePermitsReport(permits, format)
      toast.success(`Report generated successfully`)
    } catch (error) {
      toast.error('Failed to generate report')
    }
  }

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Active Permits</h1>
          <p className='text-sm text-muted-foreground mt-1'>
            Showing {permits.length} of {totalItems} permits
          </p>
        </div>
        <div className='flex items-center gap-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='gap-2'>
                <FileText className='h-4 w-4' />
                Generate Report
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => handleGenerateReport('pdf')}>
                Download as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleGenerateReport('csv')}>
                Download as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
