import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Permit | MACL DPMS',
  description: 'Request a new airport permit',
}

export default function RequestPermitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 