'use client'

import { getPermitApplications } from '@/lib/permit'
import { PermitApplication } from '@/lib/permit/types'
import { useEffect, useState } from 'react'
import { PermitApplicationsTable } from '@/components/permit-applications-table'

export default function PermitApplicationsPage() {
  const [permitApplications, setPermitApplications] = useState<
    PermitApplication[]
  >([])

  useEffect(() => {
    const fetchPermitApplications = async () => {
      const response = await getPermitApplications()
      setPermitApplications(response.data.data)
    }
    fetchPermitApplications()
  }, [])

  return (
    <div className='space-y-6 p-6'>
      <h1 className='text-2xl font-bold tracking-tight'>Permit Applications</h1>

      <PermitApplicationsTable applications={permitApplications} />
    </div>
  )
}
