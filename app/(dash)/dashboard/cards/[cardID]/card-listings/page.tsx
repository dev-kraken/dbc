import React from 'react'
import { AddNewListingButton } from '@/components/cards/listings/add-new-listing-button'
import { AllCardListings } from '@/components/cards/listings/all-card-listings'

const CardListingPage = () => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2>All Listings</h2>
        <AddNewListingButton />
      </div>
      <AllCardListings />
    </div>
  )
}

export default CardListingPage
