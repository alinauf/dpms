import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Permits | MACL DPMS',
  description: 'Manage your airport permit applications',
}

export default function StaffPermitsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Permits</h2>
        <p className='text-muted-foreground'>
          Manage your airport permit applications and view their status
        </p>
      </div>
    </div>
  )
}
