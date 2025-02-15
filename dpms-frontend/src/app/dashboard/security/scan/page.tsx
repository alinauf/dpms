'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/hooks/use-profile'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Camera, QrCode, Smartphone } from 'lucide-react'
import { Html5QrcodeScanner } from 'html5-qrcode'

export default function ScanQRPage() {
  const router = useRouter()
  const profile = useProfile()
  const [isScanning, setIsScanning] = useState(false)
  const [scannerInitialized, setScannerInitialized] = useState(false)

  const onScanSuccess = useCallback(
    (decodedText: string) => {
      const permitNumber = decodedText.split('/').pop()
      if (permitNumber) {
        router.push(`/verify-permit/${permitNumber}`)
      }
    },
    [router]
  )

  const onScanError = useCallback((error: unknown) => {
    console.error('QR scan error:', error)
  }, [])

  useEffect(() => {
    if (!profile || profile.role !== 'security') {
      toast.error('Unauthorized access')
      router.push('/dashboard')
      return
    }

    if (!scannerInitialized && !isScanning) {
      const scanner = new Html5QrcodeScanner(
        'reader',
        {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 5,
        },
        false
      )

      scanner.render(onScanSuccess, onScanError)
      setIsScanning(true)
      setScannerInitialized(true)

      return () => {
        scanner.clear()
        setIsScanning(false)
      }
    }
  }, [
    profile?.role,
    router,
    scannerInitialized,
    isScanning,
    onScanSuccess,
    onScanError,
    profile,
  ])

  const handleManualEntry = () => {
    const permitNumber = prompt('Enter permit number:')
    if (permitNumber) {
      router.push(`/verify-permit/${permitNumber}`)
    }
  }

  return (
    <div className='container max-w-2xl mx-auto p-6 space-y-8'>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.back()}
          className='rounded-full'
        >
          <ArrowLeft className='h-5 w-5' />
        </Button>
        <div>
          <h1 className='text-2xl font-bold'>Scan QR Code</h1>
          <p className='text-sm text-muted-foreground'>
            Scan a permit QR code to verify
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Camera className='h-5 w-5' />
            QR Code Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div
            id='reader'
            className='overflow-hidden rounded-lg border bg-muted'
          ></div>

          <div className='flex flex-col items-center gap-4 p-4 text-center'>
            <p className='text-sm text-muted-foreground'>
              Position the QR code within the frame to scan
            </p>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                onClick={handleManualEntry}
                className='flex items-center gap-2'
              >
                <QrCode className='h-4 w-4' />
                Enter Code Manually
              </Button>
            </div>
          </div>

          <div className='flex items-center justify-center gap-2 rounded-lg border p-4 bg-muted/50'>
            <Smartphone className='h-5 w-5 text-muted-foreground' />
            <p className='text-sm text-muted-foreground'>
              For best results, ensure good lighting and hold the device steady
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
