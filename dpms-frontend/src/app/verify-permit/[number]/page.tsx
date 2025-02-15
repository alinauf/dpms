'use client'

import React from 'react'
import { PermitVerification } from '@/components/security/permit-verification'

interface VerifyPermitPageProps {
  params: Promise<{
    number: string
  }>
}

export default function VerifyPermitPage({ params }: VerifyPermitPageProps) {
  const resolvedParams = React.use(params)

  return (
    <div className='container max-w-2xl mx-auto p-6 space-y-8'>
      <PermitVerification permitId={resolvedParams.number} />
    </div>
  )
}
