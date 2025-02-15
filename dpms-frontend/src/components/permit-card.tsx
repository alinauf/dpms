'use client'

import { Permit } from '@/lib/permit/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { PermitQRCode } from '@/components/permit-qr-code'

interface PermitCardProps {
  permit: Permit
  className?: string
}

export function PermitCard({ permit, className }: PermitCardProps) {
  return (
    <div className='space-y-6'>
      <Card className={cn('w-full overflow-hidden', className)}>
        <CardHeader className='border-b bg-muted/50'>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <CardTitle className='flex items-center gap-2'>
                {permit.permit_type.name}
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    permit.is_expired
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  )}
                >
                  {permit.is_expired ? 'Expired' : 'Active'}
                </span>
              </CardTitle>
              <CardDescription>
                Permit Number: {permit.permit_number}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-6 p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <h4 className='text-sm font-medium text-muted-foreground'>
                  Permit Details
                </h4>
                <div className='grid gap-1'>
                  <div className='text-sm'>
                    <span className='font-medium'>Type:</span>{' '}
                    {permit.permit_type.name}
                  </div>
                  <div className='text-sm'>
                    <span className='font-medium'>Rank:</span>{' '}
                    {permit.permit_type.rank}
                  </div>
                  <div className='text-sm'>
                    <span className='font-medium'>Description:</span>{' '}
                    {permit.permit_type.description}
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <h4 className='text-sm font-medium text-muted-foreground'>
                  Validity Period
                </h4>
                <div className='grid gap-1'>
                  <div className='text-sm'>
                    From: {new Date(permit.valid_from).toLocaleDateString()}
                  </div>
                  <div className='text-sm'>
                    Until: {new Date(permit.valid_until).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div className='space-y-2'>
                <h4 className='text-sm font-medium text-muted-foreground'>
                  Additional Information
                </h4>
                <div className='grid gap-1'>
                  <div className='text-sm'>
                    <span className='font-medium'>Created:</span>{' '}
                    {new Date(permit.created_at).toLocaleDateString()}
                  </div>
                  <div className='text-sm'>
                    <span className='font-medium'>Last Updated:</span>{' '}
                    {new Date(permit.updated_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {permit.permit_type.requires_approval && (
                <div className='space-y-2'>
                  <h4 className='text-sm font-medium text-muted-foreground'>
                    Approval Status
                  </h4>
                  <div className='text-sm'>
                    This permit type requires approval from HR
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <PermitQRCode permitNumber={permit.id} />
    </div>
  )
}
