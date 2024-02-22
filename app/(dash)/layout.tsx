import React from 'react'
import { Sidebar } from '@/components/sidebar/sidebar'
import { SidebarHeader } from '@/components/sidebar/sidebar-header'
import { Toaster } from 'react-hot-toast'

interface DashboardProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: DashboardProps) => {
  return (
    <main className='flex min-h-screen justify-between'>
      <div className='hidden h-full md:block'>
        <Sidebar />
      </div>
      <div className='grid size-full pl-0 md:pl-20 lg:pl-60'>
        <Toaster position='top-center' />
        <SidebarHeader />
        {children}
      </div>
    </main>
  )
}

export default AuthLayout
