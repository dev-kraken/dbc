import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Card className='w-7/12 mx-auto mt-5'>
      <CardHeader>
        <CardTitle>Card Profile</CardTitle>
        <CardDescription>Update your profile details.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-8'>
        <Skeleton className='size-36 mx-auto rounded-full' />
        <div className='space-y-5 mt-14'>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className='w-full h-10 mx-auto rounded' />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className='w-full h-8 mx-auto rounded' />
      </CardFooter>
    </Card>
  )
}
