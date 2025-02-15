'use client'

import { useEffect, useState } from 'react'
import { useProfile } from '@/hooks/use-profile'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { applyForPermit, getPermitTypes } from '@/lib/permit'
import { PermitType } from '@/lib/permit/types'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'

const formSchema = z.object({
  permit_type_id: z.string().min(1, 'Please select a permit type'),
  valid_from: z.date({
    required_error: 'Please select a start date',
  }),
  valid_until: z.date({
    required_error: 'Please select an end date',
  }),
  justification: z
    .string()
    .min(10, 'Justification must be at least 10 characters')
    .max(500, 'Justification must not exceed 500 characters'),
})

export default function RequestPermitPage() {
  const router = useRouter()
  const profile = useProfile()
  const [permitTypes, setPermitTypes] = useState<PermitType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (profile.role !== 'staff') {
      toast.error('Only staff members can request permits')
      router.push('/dashboard')
    }
  }, [profile.role, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permit_type_id: '',
      justification: '',
    },
  })

  useEffect(() => {
    const fetchPermitTypes = async () => {
      try {
        const response = await getPermitTypes()
        setPermitTypes(response.data)
      } catch (error) {
        toast.error('Failed to fetch permit types')
      }
    }

    fetchPermitTypes()
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      await applyForPermit({
        ...values,
        permit_type_id: parseInt(values.permit_type_id),
        valid_from: format(values.valid_from, 'yyyy-MM-dd'),
        valid_until: format(values.valid_until, 'yyyy-MM-dd'),
      })
      toast.success('Permit application submitted successfully')
      router.push('/dashboard/staff/permit-applications')
    } catch (error) {
      toast.error('Failed to submit permit application')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container max-w-3xl mx-auto p-6 space-y-8'>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.back()}
          className='rounded-full'
        >
          <ArrowLeft className='h-5 w-5' />
        </Button>
        <h1 className='text-2xl font-bold'>Request New Permit</h1>
      </div>

      <div className='grid gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <label className='text-sm font-medium'>Full Name</label>
              <p className='text-muted-foreground'>
                {profile.first_name} {profile.last_name}
              </p>
            </div>
            <div className='grid gap-2'>
              <label className='text-sm font-medium'>Employee ID</label>
              <p className='text-muted-foreground'>{profile.employee_id}</p>
            </div>
            <div className='grid gap-2'>
              <label className='text-sm font-medium'>Department</label>
              <p className='text-muted-foreground'>{profile.department}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permit Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='permit_type_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Permit Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a permit type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {permitTypes.map((type) => (
                            <SelectItem
                              key={type.id}
                              value={type.id.toString()}
                            >
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid gap-6 md:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='valid_from'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Valid From</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='valid_until'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Valid Until</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='justification'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Justification</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Please provide a detailed justification for your permit request'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex justify-end'>
                  <Button type='submit' disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    Submit Application
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 