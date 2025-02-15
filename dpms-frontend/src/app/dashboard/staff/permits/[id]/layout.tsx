import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Permit Details | MACL DPMS',
  description: 'View permit details',
}

export default function PermitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 