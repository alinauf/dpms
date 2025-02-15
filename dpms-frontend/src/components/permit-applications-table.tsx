'use client'

import { PermitApplication } from '@/lib/permit/types'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface PermitApplicationsTableProps {
  applications: PermitApplication[]
  showSearch?: boolean
  onRowClick?: (application: PermitApplication) => void
}

export function PermitApplicationsTable({
  applications,
  showSearch = true,
  onRowClick,
}: PermitApplicationsTableProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const getStatus = (application: PermitApplication) => {
    if (application.approval_status === null) {
      return 'Pending'
    }
    return application.approval_status ? 'Approved' : 'Rejected'
  }

  const filteredApplications = applications.filter(
    (app) =>
      app.permit_type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.justification?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getStatus(app).toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRowClick = (application: PermitApplication) => {
    if (onRowClick) {
      onRowClick(application)
    } else {
      router.push(`/dashboard/staff/permit-applications/${application.id}`)
    }
  }

  return (
    <div className='space-y-4'>
      {showSearch && (
        <div className='w-72'>
          <Input
            placeholder='Search applications...'
            className='w-full'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className='rounded-md border bg-card'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='w-[200px] font-medium'>
                Permit Type
              </TableHead>
              <TableHead className='w-[120px] font-medium'>Status</TableHead>
              <TableHead className='w-[150px] font-medium'>
                Valid From
              </TableHead>
              <TableHead className='w-[150px] font-medium'>
                Valid Until
              </TableHead>
              <TableHead className='font-medium'>Justification</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((application) => (
              <TableRow
                key={application.id}
                className='cursor-pointer transition-colors hover:bg-muted/50'
                onClick={() => handleRowClick(application)}
              >
                <TableCell className='font-medium'>
                  {application.permit_type.name}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      getStatus(application) === 'Approved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : getStatus(application) === 'Rejected'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                  >
                    {getStatus(application)}
                  </span>
                </TableCell>
                <TableCell className='text-muted-foreground'>
                  {new Date(application.valid_from).toLocaleDateString()}
                </TableCell>
                <TableCell className='text-muted-foreground'>
                  {new Date(application.valid_until).toLocaleDateString()}
                </TableCell>
                <TableCell className='truncate max-w-xs text-muted-foreground'>
                  {application.justification}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
