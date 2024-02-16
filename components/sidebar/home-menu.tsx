'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { HomeSidebarRoutes } from '@/constants'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useEffect, useState } from 'react'

export const HomeMenu = () => {
  const hasWindow = typeof window !== 'undefined'

  function isLargeScreen() {
    const lgBreakpoint = 1024
    return hasWindow ? window.innerWidth >= lgBreakpoint : false
  }

  const [isLGScreen, setIsLGScreen] = useState(isLargeScreen())
  const updateIsLGScreen = () => {
    setIsLGScreen(isLargeScreen())
  }
  useEffect(() => {
    window.addEventListener('resize', updateIsLGScreen)
    return () => {
      window.removeEventListener('resize', updateIsLGScreen)
    }
  },)
  const pathName = usePathname()
  return (
    <TooltipProvider>
      <ul className='space-y-1'>
        <h4 className='py-2 text-xs font-medium text-muted-foreground'>General Menu</h4>
        {HomeSidebarRoutes.slice(0, 5).map(link => {
          const isActive = link.route === pathName
          return !isLGScreen ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <li
                  key={link.route}
                  className={cn(
                    isActive && 'bg-gradient-to-r from-purple-100 to-purple-400 text-slate-600',
                    `group flex w-full cursor-pointer justify-start rounded-lg from-purple-100 to-purple-400 p-3 text-sm font-medium
                    transition hover:bg-gradient-to-r hover:text-slate-600`
                  )}
                >
                  <Link href={link.route} className='flex w-full gap-3'>
                    <link.icon className='size-5 text-purple-600' />
                  </Link>
                </li>
              </TooltipTrigger>
              <TooltipContent side='right' className='bg-purple-700'>
                <p>{link.label}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <li
              key={link.route}
              className={cn(
                isActive && 'bg-gradient-to-r from-purple-100 to-purple-400 text-slate-600',
                `group flex w-full cursor-pointer justify-start rounded-lg from-purple-100 to-purple-400 p-3 text-sm font-medium
                transition hover:bg-gradient-to-r hover:text-slate-600`
              )}
            >
              <Link href={link.route} className='flex w-full gap-3'>
                <link.icon className='size-5 text-purple-600' />
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </TooltipProvider>
  )
}
