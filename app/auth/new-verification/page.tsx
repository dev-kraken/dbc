import React from 'react'
import { NewVerificationForm } from '@/components/auth/new-verification-form'

export const metadata = {
  title: 'Email verification',
  description: 'Verify your email'
}
const NewVerificationPage = () => {
  return <NewVerificationForm />
}

export default NewVerificationPage
