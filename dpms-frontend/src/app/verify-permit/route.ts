import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ message: 'Verify permit route is working' })
} 