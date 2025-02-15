'use client'

import { useEffect, useState } from 'react'
import { PermitApplication } from '@/lib/permit/types'
import { PermitApplicationsTable } from '@/components/permit-applications-table'
import { Button } from '@/components/ui/button'
import { getPermitApplications } from '@/lib/permit'
import { Download, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { generatePermitApplicationsReport } from '@/lib/reports/generate-reports'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

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

  const handleGenerateReport = async (format: 'pdf' | 'csv') => {
    try {
      if (!permitApplications.length) {
        toast.error('No data available for report')
        return
      }

      await generatePermitApplicationsReport(permitApplications, format)
      toast.success(`Report generated successfully`)
    } catch (error) {
      console.error('Report generation error:', error)
      toast.error('Failed to generate report')
    }
  }

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Permit Applications
          </h1>
          <p className='text-sm text-muted-foreground mt-1'>
            Showing {permitApplications.length} of {totalItems} applications
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