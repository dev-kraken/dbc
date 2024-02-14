'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import React from 'react'

export const AuthBanner = () => {
  const pathname = usePathname()
  if (pathname === '/auth/new-verification') {
    return (
      <Image
        src='/Verfication-Email.svg'
        alt='Secure Login'
        fill
        className='object-contain'
        priority={true}
        placeholder='empty'
      />
    )
  }
  return (
    <Image
      src='/Login-Secure.svg'
      alt='Secure Login'
      fill
      className='object-contain'
      priority={true}
      placeholder='empty'
    />
  )
}
