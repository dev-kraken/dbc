'use client'
import { HomeSidebarRoutes } from '@/data/sidebar-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const HomeMenu = () => {
  const pathName = usePathname()
  return (
    <div className='space-y-1'>
      <h4 className='py-2 text-xs font-medium text-muted-foreground'>
        General Menu
      </h4>
      {HomeSidebarRoutes.map(route => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            route.href === pathName &&
              'bg-gradient-to-r from-purple-100 to-purple-400 text-slate-600',
            'group flex w-full cursor-pointer justify-start rounded-lg from-purple-100 to-purple-400 p-3 text-sm font-medium transition hover:bg-gradient-to-r hover:text-slate-600'
          )}
        >
          <div className='flex flex-1 items-center'>
            <route.icon className='mr-3 size-5 text-purple-400' />
            {route.label}
          </div>
        </Link>
      ))}
    </div>
  )
}
