'use client'

import { PermitApplication } from '@/lib/permit/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface PermitApplicationCardProps {
  application: PermitApplication
  className?: string
}

export function PermitApplicationCard({
  application,
  className,
}: PermitApplicationCardProps) {
  const getStatus = (application: PermitApplication) => {
    if (application.approval_status === null) {
      return 'Pending'
    }
    return application.approval_status ? 'Approved' : 'Rejected'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }
  }

  const status = getStatus(application)

  return (
    <Card className={cn('w-full overflow-hidden', className)}>
      <CardHeader className='border-b bg-muted/50'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <CardTitle className='flex items-center gap-2'>
              {application.permit_type.name}
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                  getStatusColor(status)
                )}
              >
                {status}
              </span>
            </CardTitle>
            <CardDescription>
              ID: {application.id} • Created{' '}
              {new Date(application.created_at).toLocaleDateString()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-6 p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-muted-foreground'>
                Applicant Details
              </h4>
              <div className='grid gap-1'>
                <div className='text-sm font-medium'>
                  {application.user.first_name} {application.user.last_name}
                </div>
                <div className='text-sm text-muted-foreground'>
                  {application.user.employee_id} • {application.user.department}
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-muted-foreground'>
                Validity Period
              </h4>
              <div className='grid gap-1'>
                <div className='text-sm'>
                  From: {new Date(application.valid_from).toLocaleDateString()}
                </div>
                <div className='text-sm'>
                  Until:{' '}
                  {new Date(application.valid_until).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-muted-foreground'>
                Justification
              </h4>
              <p className='text-sm whitespace-pre-wrap rounded-lg bg-muted p-3'>
                {application.justification}
              </p>
            </div>

            {application.approval_comment && (
              <div className='space-y-2'>
                <h4 className='text-sm font-medium text-muted-foreground'>
                  Approval Comment
                </h4>
                <p className='text-sm whitespace-pre-wrap rounded-lg bg-muted p-3'>
                  {application.approval_comment}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
