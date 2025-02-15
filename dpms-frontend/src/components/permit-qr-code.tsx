'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { toast } from 'sonner'

interface PermitQRCodeProps {
  permitNumber: number
  className?: string
}

export function PermitQRCode({ permitNumber, className }: PermitQRCodeProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
  const qrValue = `${baseUrl}/verify-permit/${permitNumber}`

  const handleDownload = () => {
    try {
      const svg = document.getElementById('permit-qr-code')
      if (!svg) return

      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL('image/png')

        // Download PNG
        const downloadLink = document.createElement('a')
        downloadLink.download = `permit-${permitNumber}.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }

      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    } catch {
      toast.error('Failed to download QR code')
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold'>
            Permit QR Code
          </CardTitle>
          <Button
            variant='outline'
            size='sm'
            className='gap-2'
            onClick={handleDownload}
          >
            <Download className='h-4 w-4' />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent className='flex justify-center p-6'>
        <div className='bg-white p-4 rounded-lg'>
          <QRCodeSVG
            id='permit-qr-code'
            value={qrValue}
            size={200}
            level='H'
            includeMargin
            imageSettings={{
              src: '/logo.png',
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
