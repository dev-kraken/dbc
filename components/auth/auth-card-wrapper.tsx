'use client'

import React from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { AuthHeader } from '@/components/auth/auth-header'
import { AuthSocial } from '@/components/auth/auth-social'
import { AuthBackButton } from '@/components/auth/auth-back-button'

interface AuthCardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  label: string
  backButtonLabel: string
  onBackButtonClick: string
  showSocialLogin?: boolean
}

export const AuthCardWrapper = ({
  children,
  headerLabel,
  label,
  backButtonLabel,
  onBackButtonClick,
  showSocialLogin
}: AuthCardWrapperProps) => {
  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
        <AuthHeader title={headerLabel} label={label} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocialLogin && (
        <CardFooter>
          <AuthSocial />
        </CardFooter>
      )}
      <CardFooter>
        <AuthBackButton label={backButtonLabel} href={onBackButtonClick} />
      </CardFooter>
    </Card>
  )
}
