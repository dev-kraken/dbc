'use client'

import { AuthCardWrapper } from '@/components/auth/auth-card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { RegisterSchema } from '@/schemas/auth-schema'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AuthFormError } from '@/components/auth/auth-form-error'
import { AuthFormSuccess } from '@/components/auth/auth-form-success'
import { register } from '@/action/auth'
import { ScaleLoader } from 'react-spinners'

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fName: '',
      lName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      register(values).then(data => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }
  return (
    <AuthCardWrapper
      headerLabel='Create an account'
      label="Let's get started with your account."
      backButtonLabel='Already have an account?'
      onBackButtonClick='/auth/login'
      showSocialLogin
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-2 '>
              <FormField
                control={form.control}
                name='fName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='John'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='Doe'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='john.doe@example.com'
                      type='email'
                      autoComplete='email'
                      className='h-10 focus-visible:border-teal-500 focus-visible:ring-0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='******'
                      type='password'
                      className='h-10 focus-visible:border-teal-500 focus-visible:ring-0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='******'
                      type='password'
                      className='h-10 focus-visible:border-teal-500 focus-visible:ring-0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <AuthFormError message={error} />
          <AuthFormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            {!isPending && 'Create an account'}
            <ScaleLoader
              loading={isPending}
              color='#fff'
              height={20}
              width={4}
              aria-label='Loading...'
            />
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  )
}
