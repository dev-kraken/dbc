import React, { Suspense } from 'react'
import { LoginForm } from '@/components/auth/login-form'
import AuthLoading from '@/app/auth/login/loading'

export const metadata = {
  title: 'Login',
  description: 'Login to your account'
}
const LoginPage = () => {
  return (
    <Suspense fallback={<AuthLoading />}>
      <LoginForm />
    </Suspense>
  )
}

export default LoginPage
