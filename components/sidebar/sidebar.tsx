import { SiArlo } from 'react-icons/si'
import { MainMenu } from '@/components/sidebar/main-menu'
import { signOut } from '@/auth'
import React from 'react'
import { Button } from '@/components/ui/button'
import { AiOutlineLogout } from 'react-icons/ai'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FcApproval, FcUnlock } from 'react-icons/fc'
import { LiaRocketSolid } from 'react-icons/lia'

export const Sidebar = () => {
  return (
    <aside className='fixed flex min-h-screen w-20 flex-col space-y-2 border-r px-4 py-2 lg:w-60'>
      <div className='flex items-center gap-x-2 border-b py-2.5'>
        <SiArlo size={32} color='#9333EA' />
        <h1 className='hidden text-2xl font-bold lg:block'>DBC</h1>
      </div>
      <MainMenu />
      <div className='space-y-4 pb-4'>
        <Card className='hidden lg:block w-full'>
          <CardHeader>
            <CardTitle className='flex w-full items-center gap-1'>
              <FcUnlock size={20} />
              Unlock Premium
            </CardTitle>
          </CardHeader>
          <CardContent className='p-3'>
            <ul className='text-xs text-muted-foreground space-y-2'>
              <li className='flex items-start gap-1'>
                <FcApproval size={20} />
                Unlock advanced analytics and insights
              </li>
              <li className='flex items-start gap-1'>
                <FcApproval size={20} />
                Unlock advanced analytics and insights
              </li>
              <li className='flex items-start gap-1'>
                <FcApproval size={12} />
                And much more!
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full bg-gradient-to-r from-pink-500 to-yellow-500 gap-1 hover:bg-gradient-to-l'>
              <LiaRocketSolid />
              Upgrade to Pro
            </Button>
          </CardFooter>
        </Card>
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <Button type='submit' variant='purpleButton' className='flex w-full gap-2'>
            <AiOutlineLogout size={20} />
            Logout
          </Button>
        </form>
      </div>
    </aside>
  )
}
