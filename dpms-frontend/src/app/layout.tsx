import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { MainNav } from '@/components/main.nav'
import { ProtectedRoute } from './protected-route'

const geist = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Digital Permit Management System',
  description: 'Digital Permit Management System',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ProtectedRoute>
            <div className='min-h-screen'>
              <MainNav />
              <main className='container mx-auto py-6'>{children}</main>
            </div>
          </ProtectedRoute>
        </ThemeProvider>
      </body>
    </html>
  )
}
