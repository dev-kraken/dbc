import { Skeleton } from '@/components/ui/skeleton'
import { DbcSkeleton } from '@/components/cards/all-cards/dbc-skeleton'
import React from 'react'

export const SidebarNavSkeleton = () => {
  return (
    <div className='grow space-y-4'>
      {[...Array(6)].map((_, index) => (
        <div key={index} className='flex items-center w-full gap-2 border border-foreground/10 p-2 rounded'>
          <Skeleton className='size-8 rounded-full' />
          <Skeleton className='h-6 w-36' />
        </div>
      ))}
    </div>
  )
}
