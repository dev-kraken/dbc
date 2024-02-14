'use client'

import { useCallback, useEffect, useState } from 'react'
import { ScaleLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { AuthFormSuccess } from '@/components/auth/auth-form-success'
import { AuthFormError } from '@/components/auth/auth-form-error'
import { AuthCardWrapper } from '@/components/auth/auth-card-wrapper'
import { newVerification } from '@/action/auth'

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) return

    if (!token) {
      setError('Missing token!')
      return
    }

    newVerification(token)
      .then(data => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <AuthCardWrapper
      headerLabel='Email verification'
      label='Please wait while we verify your email.'
      backButtonLabel='Back to login'
      onBackButtonClick='/auth/login'
    >
      <div className='flex w-full items-center justify-center'>
        {!success && !error && (
          <ScaleLoader
            color='#36D7B7'
            aria-label='Loading...'
          />
        )}
        <AuthFormSuccess message={success} />
        {!success && <AuthFormError message={error} />}
      </div>
    </AuthCardWrapper>
  )
}
