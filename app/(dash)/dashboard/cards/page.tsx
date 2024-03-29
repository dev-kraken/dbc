import React, { Suspense } from 'react'
import { DbcCardWrapper } from '@/components/cards/all-cards/dbc-card-wrapper'
import { getAllCards } from '@/action/card-action'
import Loading from '@/app/(dash)/dashboard/cards/loading'
import { DbcCreateNewCardButton } from '@/components/cards/all-cards/dbc-create-new-card-button'

const Cards = async () => {
  const allCards = await getAllCards()
  return (
    <div>
      <div className='flex justify-between items-center p-2'>
        <h1 className='text-xl'>Your Cards</h1>
        <DbcCreateNewCardButton />
      </div>
      <div className='grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
