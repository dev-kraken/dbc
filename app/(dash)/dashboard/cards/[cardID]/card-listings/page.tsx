import React from 'react'
import { AddNewListingButton } from '@/components/cards/listings/add-new-listing-button'
import { AllCardListings } from '@/components/cards/listings/all-card-listings'
import { getCardListings } from '@/action/card-action'

const CardListingPage = async ({params}: {params: {cardID: string}}) => {
  const allListings = await getCardListings(params.cardID)
  return (
    <main className="space-y-6">
      <div className='flex justify-between items-center'>
        <h2>All Listings</h2>
        <AddNewListingButton cardID={params.cardID} />
      </div>
      <AllCardListings allListings={allListings} />
    </main>
  )
}

export default CardListingPage
