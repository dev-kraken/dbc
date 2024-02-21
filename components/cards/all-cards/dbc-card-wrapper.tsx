import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { DbcCardHeader } from '@/components/cards/all-cards/dbc-card-header'
import { AllCards } from '@/types/all-cards'
import { Button } from '@/components/ui/button'

interface DbcCardWrapperProps {
  children: React.ReactNode
  card: AllCards
}

export const DbcCardWrapper = ({ children, card }: DbcCardWrapperProps) => {
  return (
    <Card className='w-full rounded-sm shadow-md'>
      <CardHeader className='p-4'>
        <DbcCardHeader cardImage={card.cardImageSysName} cardID={card.cardGuid} cardName={card.cardName} />
      </CardHeader>
      <CardContent className='mt-2 space-y-1 px-4'>
        <p className='text-xs italic text-muted-foreground'>Card Name</p>
        <h2 className='text-2xl font-medium text-zinc-700 truncate'>{children}</h2>
      </CardContent>
      <CardFooter className='flex gap-2 px-4'>
        <Button className='w-full bg-purple-400 hover:bg-purple-500'>Edit</Button>
        <Button className='w-full' variant='secondary'>
          Preview
        </Button>
      </CardFooter>
    </Card>
  )
}
