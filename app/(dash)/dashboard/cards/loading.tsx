import React from 'react'
import { DbcSkeleton } from '@/components/cards/all-cards/dbc-skeleton'

const Loading = () => {
  return (
    <div className='grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {[...Array(8)].map((_, index) => (
        <DbcSkeleton key={index} />
      ))}
    </div>
  )
}

export default Loading
