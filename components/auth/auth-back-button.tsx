'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface AuthBackButtonProps {
  label: string
  href: string
}

export const AuthBackButton = ({ label, href }: AuthBackButtonProps) => {
  return (
    <Button variant='link' className='w-full font-normal' size='sm' asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}
