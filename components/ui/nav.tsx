/** @format */

'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { usePathname } from 'next/navigation'
import { IconType } from 'react-icons'

type HomeSidebarRoutesT = {
  title: string
  icon: IconType
  href: string
  label?: string
  variant?: string
}

interface NavProps {
  isCollapsed: boolean
  links: HomeSidebarRoutesT[]
  menuTitle?: string
}

export function NavKraken({ links, isCollapsed, menuTitle }: NavProps) {
  const pathName = usePathname()
  return (
    <TooltipProvider>
      <div data-collapsed={isCollapsed} className='group flex grow flex-col'>
        <h4 className='py-2 text-xs font-medium text-muted-foreground'>{menuTitle}</h4>
        <nav className='space-y-2'>
          {links.map((link, index)=>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      link.href === pathName && 'bg-gradient-to-r from-purple-100 to-purple-400 text-slate-600',
                      `group flex w-full cursor-pointer justify-center rounded-lg from-purple-100 to-purple-400 p-3 text-sm font-medium
                      transition hover:bg-gradient-to-r hover:text-slate-600 items-center`
                    )}
                  >
                    <link.icon className='size-5 text-purple-600' />
                    <span className='sr-only'>{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right' className='flex items-center gap-4'>
                  {link.title}
                  {link.label && <span className='ml-auto text-muted-foreground'>{link.label}</span>}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  link.href === pathName && 'bg-gradient-to-r from-purple-100 to-purple-400 text-slate-600',
                  `group flex w-full cursor-pointer justify-start rounded-lg from-purple-100 to-purple-400 p-3 text-sm font-medium
                  transition hover:bg-gradient-to-r hover:text-slate-600`
                )}
              >
                <link.icon className='mr-2 size-5 text-purple-600' />
                {link.title}
                {link.label && (
                  <span className={cn('ml-auto', link.variant === 'default' && 'text-background dark:text-white')}>
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  )
}
