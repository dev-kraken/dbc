import { SiArlo } from 'react-icons/si'
import { HomeMenu } from '@/components/sidebar/home-menu'
import { signOut } from '@/auth'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FiLogOut } from 'react-icons/fi'

export const Sidebar = () => {
  return (
    <aside className='fixed flex min-h-screen w-20 flex-col space-y-2 border-r px-4 py-2 lg:w-60'>
      <div className='flex items-center gap-x-2 border-b py-2.5'>
        <SiArlo size={32} color='#9333EA' />
        <h1 className='hidden text-2xl font-bold lg:block'>DBC</h1>
      </div>
      <nav className='grow'>
        <HomeMenu />
      </nav>
      <div>
        <form
          action={async () => {
            'use server'

            await signOut()
          }}
        >
          <Button type='submit' variant='outline' className='flex w-full gap-2'>
            <FiLogOut size={20} className='text-purple-400' />
            Logout
          </Button>
        </form>
      </div>
    </aside>
  )
}
