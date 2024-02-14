'use client'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

export const AuthSocial = () => {
  return (
    <div className='flex w-full items-center gap-x-2'>
      <Button variant='outline' className='w-full' size='lg'>
        <FcGoogle className='size-5' />
      </Button>
      <Button variant='outline' className='w-full' size='lg'>
        <FaFacebook className='size-5 text-facebook' />
      </Button>
    </div>
  )
}
