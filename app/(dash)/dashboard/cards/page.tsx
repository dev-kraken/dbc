import React, { Suspense } from 'react'
import { DbcCardWrapper } from '@/components/cards/all-cards/dbc-card-wrapper'
import { getAllCards } from '@/action/card-action'
import { Button } from '@/components/ui/button'
import { FiPlus } from 'react-icons/fi'
import Loading from '@/app/(dash)/dashboard/cards/loading'

const Cards = async () => {
  const allCards = await getAllCards()
  return (
    <div>
      <div className='flex justify-between p-2 md:p-4'>
        <h1 className='text-2xl'>Cards</h1>
        <Button className='flex gap-1'>
          <FiPlus size={20} />
          Add Card
        </Button>
      </div>
      <div className='grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Suspense fallback={<Loading />}>
          {allCards?.map(card => (
            <DbcCardWrapper key={card.id} card={card}>
              {card.cardName}
            </DbcCardWrapper>
          ))}
        </Suspense>
      </div>
    </div>
  )
}

export default Cards
