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

import { LoginSchema } from '@/schemas/auth-schema'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AuthFormError } from '@/components/auth/auth-form-error'
import { AuthFormSuccess } from '@/components/auth/auth-form-success'
import { login } from '@/action/auth'
import { ScaleLoader } from 'react-spinners'

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      login(values).then(data => {
        setError(data?.error)
        // setSuccess(data?.success)
      })
    })
  }
  return (
    <AuthCardWrapper
      headerLabel='Welcome back!'
      label='Please enter your details.'
      backButtonLabel="Don't have an account ?"
      onBackButtonClick='/auth/register'
      showSocialLogin
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
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
          </div>
          <AuthFormError message={error} />
          <AuthFormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            {!isPending && 'Login'}
            <ScaleLoader
              loading={isPending}
              color='#A855F7'
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
