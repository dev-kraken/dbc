import React from 'react'
import { AddNewListingButton } from '@/components/cards/listings/add-new-listing-button'

const CardListingPage = () => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2>All Listings</h2>
        <AddNewListingButton />
      </div>
    </div>
  )
}

export default CardListingPage
