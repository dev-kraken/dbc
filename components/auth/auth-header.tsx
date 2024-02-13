import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

interface AuthHeaderProps {
  label: string
}

export const AuthHeader = ({ label }: AuthHeaderProps) => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-y-4'>
      <h1
        className={cn(
          'bg-gradient-to-br from-teal-600 to-zinc-600 bg-clip-text text-3xl font-semibold text-transparent',
          font.className
        )}
      >
        {label}
      </h1>
      <p className='text-sm italic text-muted-foreground'>Login</p>
    </div>
  )
}
