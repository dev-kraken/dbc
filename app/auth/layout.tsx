import React from 'react'
import { AuthBanner } from '@/components/auth/auth-banner'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='h-screen'>
      <div
        className='container relative h-screen
          flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'
      >
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <AuthBanner />
          <div className='relative z-20 flex items-center text-lg font-bold text-zinc-800'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#14b8a6'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 size-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            DBC
          </div>
        </div>
        <div className='flex h-screen w-full items-center justify-center'>
          {children}
        </div>
      </div>
    </main>
  )
}

export default AuthLayout