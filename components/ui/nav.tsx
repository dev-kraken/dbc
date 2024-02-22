/** @format */

'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { usePathname } from 'next/navigation'
import { HomeSidebarRoutes } from '@/types/sidebar'

interface NavProps {
  isCollapsed: boolean
  links: HomeSidebarRoutes[]
  menuTitle?: string
}

export function NavKraken({ links, isCollapsed, menuTitle }: NavProps) {
  const pathName = usePathname()
  return (
    <TooltipProvider>
      <div data-collapsed={isCollapsed} className='flex grow flex-col'>
        <h4 className='py-2 text-xs font-medium text-muted-foreground'>{menuTitle}</h4>
        <nav className='space-y-2'>
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      link.href === pathName ? 'bg-gradient-to-l text-white border-0' : 'border',
                      `group flex w-full cursor-pointer justify-center rounded-md from-purple-400 via-purple-600 to-purple-900 p-3 text-sm
                      font-medium transition-all hover:bg-gradient-to-br items-center border`
                    )}
                  >
                    <link.icon
                      className={cn(
                        link.href === pathName ? 'text-white' : 'text-purple-600',
                        'size-5 group-hover:text-white group-hover:animate-pulse'
                      )}
                    />
                    <span className='sr-only'>{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right' className='flex items-center gap-4 bg-purple-700'>
                  {link.title}
                  {link.label && <span className='ml-auto text-muted-foreground'>{link.label}</span>}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  link.href === pathName ? 'bg-gradient-to-l text-white' : 'text-zinc-700',
                  `group flex w-full cursor-pointer justify-start rounded-md from-purple-400 via-purple-600 to-purple-900 p-3 text-sm
                  font-medium transition-all hover:bg-gradient-to-br hover:text-white gap-2 items-center`
                )}
              >
                <link.icon
                  className={cn(
                    link.href === pathName ? 'text-white' : 'text-purple-600',
                    'size-5 group-hover:text-white group-hover:animate-pulse'
                  )}
                />
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
