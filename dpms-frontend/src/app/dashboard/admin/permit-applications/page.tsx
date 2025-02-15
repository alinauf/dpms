'use client'

import { useEffect, useState } from 'react'
import { PermitApplication } from '@/lib/permit/types'
import { PermitApplicationsTable } from '@/components/permit-applications-table'
import { Button } from '@/components/ui/button'
import { getPermitApplications } from '@/lib/permit'
import { Download } from 'lucide-react'

export default function AdminPermitApplicationsPage() {
  const [permitApplications, setPermitApplications] = useState<
    PermitApplication[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPermitApplications = async () => {
      try {
        const response = await getPermitApplications()
        setPermitApplications(response.data.data)
      } catch (error) {
        console.error('Error fetching permit applications:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPermitApplications()
  }, [])

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export clicked')
  }

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>
          All Permit Applications
        </h1>
        <Button onClick={handleExport} className='gap-2'>
          <Download className='h-4 w-4' />
          Export
        </Button>
      </div>

      <PermitApplicationsTable applications={permitApplications} />
    </div>
  )
} 