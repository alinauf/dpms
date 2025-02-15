import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Permits | MACL DPMS',
  description: 'Manage your airport permit applications',
}

export default function StaffPermitsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 