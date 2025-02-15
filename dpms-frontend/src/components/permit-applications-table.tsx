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
import { useProfile } from '@/hooks/use-profile'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PermitApplicationsTableProps {
  applications: PermitApplication[]
  showSearch?: boolean
  onRowClick?: (application: PermitApplication) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

function getPaginationRange(currentPage: number, totalPages: number) {
  const delta = 2 // Number of pages to show on each side of current page
  const range: (number | string)[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || // First page
      i === totalPages || // Last page
      (i >= currentPage - delta && i <= currentPage + delta) // Pages around current
    ) {
      range.push(i)
    } else if (range[range.length - 1] !== '...') {
      range.push('...')
    }
  }

  return range
}

export function PermitApplicationsTable({
  applications,
  showSearch = true,
  onRowClick,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PermitApplicationsTableProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const user = useProfile()

  // Sort applications by created_at in descending order
  const sortedApplications = [...applications].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  //count applications
  const countApplications = sortedApplications.length
  console.log(countApplications)
  console.log('total pages', totalPages)

  const getStatus = (application: PermitApplication) => {
    if (application.approval_status === null) {
      return 'Pending'
    }
    return application.approval_status ? 'Approved' : 'Rejected'
  }

  const filteredApplications = sortedApplications.filter(
    (app) =>
      app.permit_type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.justification?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getStatus(app).toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRowClick = (application: PermitApplication) => {
    if (onRowClick) {
      onRowClick(application)
    } else {
      router.push(
        `/dashboard/${user.role}/permit-applications/${application.id}`
      )
    }
  }

  const paginationRange = getPaginationRange(currentPage, totalPages)

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
              <TableHead className='w-[150px] font-medium'>
                Created At
              </TableHead>
              <TableHead className='font-medium'>Justification</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>
                  <div className='flex items-center justify-center space-x-2'>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent'></div>
                    <span className='text-muted-foreground'>Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>
                  <span className='text-muted-foreground'>
                    No applications found
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              filteredApplications.map((application) => (
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
                  <TableCell className='text-muted-foreground'>
                    {new Date(application.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className='truncate max-w-xs text-muted-foreground'>
                    {application.justification}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex justify-center'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) onPageChange(currentPage - 1)
                }}
                className={
                  currentPage <= 1 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>

            {paginationRange.map((page, index) => (
              <PaginationItem key={index}>
                {page === '...' ? (
                  <span className='px-4 py-2 text-sm text-muted-foreground'>
                    ...
                  </span>
                ) : (
                  <PaginationLink
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      onPageChange(page as number)
                    }}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) onPageChange(currentPage + 1)
                }}
                className={
                  currentPage >= totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
