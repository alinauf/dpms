import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scan QR Code | MACL DPMS',
  description: 'Scan and verify permit QR codes',
}

export default function ScanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 