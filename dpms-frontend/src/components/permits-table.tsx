'use client'

import { Permit } from '@/lib/permit/types'
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

interface PermitsTableProps {
  permits: Permit[]
  showSearch?: boolean
  onRowClick?: (permit: Permit) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

function getPaginationRange(currentPage: number, totalPages: number) {
  const delta = 2
  const range: (number | string)[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i)
    } else if (range[range.length - 1] !== '...') {
      range.push('...')
    }
  }

  return range
}

export function PermitsTable({
  permits,
  showSearch = true,
  onRowClick,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PermitsTableProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const user = useProfile()

  // Sort permits by created_at in descending order
  const sortedPermits = [...permits].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const filteredPermits = sortedPermits.filter(
    (permit) =>
      permit.permit_type.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      permit.permit_number.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRowClick = (permit: Permit) => {
    if (onRowClick) {
      onRowClick(permit)
    } else {
      router.push(`/dashboard/${user.role}/permits/${permit.id}`)
    }
  }

  const paginationRange = getPaginationRange(currentPage, totalPages)

  return (
    <div className='space-y-4'>
      {showSearch && (
        <div className='w-72'>
          <Input
            placeholder='Search permits...'
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
              <TableHead className='w-[150px] font-medium'>
                Permit Number
              </TableHead>
              <TableHead className='w-[150px] font-medium'>
                Permit Type
              </TableHead>
              <TableHead className='w-[150px] font-medium'>
                Valid From
              </TableHead>
              <TableHead className='w-[150px] font-medium'>
                Valid Until
              </TableHead>
              <TableHead className='w-[100px] font-medium'>Status</TableHead>
              <TableHead className='w-[150px] font-medium'>
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  <div className='flex items-center justify-center space-x-2'>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent'></div>
                    <span className='text-muted-foreground'>Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredPermits.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  <span className='text-muted-foreground'>
                    No permits found
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              filteredPermits.map((permit) => (
                <TableRow
                  key={permit.id}
                  className='cursor-pointer transition-colors hover:bg-muted/50'
                  onClick={() => handleRowClick(permit)}
                >
                  <TableCell className='font-medium'>
                    {permit.permit_number}
                  </TableCell>
                  <TableCell>{permit.permit_type.name}</TableCell>
                  <TableCell className='text-muted-foreground'>
                    {new Date(permit.valid_from).toLocaleDateString()}
                  </TableCell>
                  <TableCell className='text-muted-foreground'>
                    {new Date(permit.valid_until).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        permit.is_expired
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}
                    >
                      {permit.is_expired ? 'Expired' : 'Active'}
                    </span>
                  </TableCell>
                  <TableCell className='text-muted-foreground'>
                    {new Date(permit.created_at).toLocaleDateString()}
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
