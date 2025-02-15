export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-[400px] p-4 space-y-6'>{children}</div>
    </div>
  )
}
