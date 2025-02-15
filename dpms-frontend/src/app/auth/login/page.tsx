import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/login-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Login | MACL DPMS',
  description: 'Login to Digital Permit Management System',
}

export default function LoginPage() {
  return (
    <>
      <div className='flex flex-col space-y-2 text-center mb-4'>
        
        <h1 className='text-2xl font-semibold tracking-tight'>
          Digital Permit Management System
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </>
  )
}
