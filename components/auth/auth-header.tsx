import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import React from 'react'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

interface AuthHeaderProps {
  label: string
  title: string
}

export const AuthHeader = ({ title, label }: AuthHeaderProps) => {
  return (
    <div className='mb-2 flex w-full flex-col items-center justify-center gap-y-2'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='#9333EA'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='mr-2 size-10'
      >
        <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
      </svg>
      <h1
        className={cn(
          'bg-gradient-to-br from-zinc-400 to-purple-600 bg-clip-text text-3xl font-semibold text-transparent',
          font.className
        )}
      >
        {title}
      </h1>
      <p className='text-sm italic text-zinc-800'>{label}</p>
    </div>
  )
}
