import React from 'react'
import { DbcCardWrapper } from '@/components/cards/all-cards/dbc-card-wrapper'
import { getAllCards } from '@/action/card-action'       {allCards?.map(card => (
          <DbcCardWrapper key={card.id} card={card}>
            {card.cardName}
          </DbcCardWrapper>
        ))}
        {allCards?.map(card => (
          <DbcCardWrapper key={card.id} card={card}>
            {card.cardName}
          </DbcCardWrapper>
        ))}
import { Button } from '@/components/ui/button'
import { FiPlus } from 'react-icons/fi'

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
        {allCards?.map(card => (
          <DbcCardWrapper key={card.id} card={card}>
            {card.cardName}
          </DbcCardWrapper>
        ))}
      </div>
    </div>
  )
}

export default Cards
