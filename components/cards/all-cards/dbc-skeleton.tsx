import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { MdMoreVert } from 'react-icons/md'
import React from 'react'

export const DbcSkeleton = () => {
  return (
    <Card className='w-full rounded-sm shadow-md'>
      <CardHeader className='p-4'>
        <div className='flex w-full items-start justify-between'>
          <Skeleton className='size-14 rounded-full' />
          <MdMoreVert className='size-5' />
        </div>
      </CardHeader>
      <CardContent className='mt-2 space-y-1 px-4'>
        <p className='text-xs italic text-muted-foreground'>Card Name</p>
        <h2 className='text-2xl font-medium text-zinc-700'>
          <Skeleton className='h-6 w-36' />
        </h2>
      </CardContent>
      <CardFooter className='flex gap-2 px-4'>
        <Skeleton className='h-10 w-full rounded' />
        <Skeleton className='h-10 w-full rounded' />
      </CardFooter>
    </Card>
  )
}
