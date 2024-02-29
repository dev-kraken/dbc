import Image from 'next/image'
import { AllCardListings as AllCardListingsT } from '@/types/card'
import { ImageURL } from '@/data/images-url'
import { Button } from '@/components/ui/button'
import { TbHomeEdit, TbHomeX } from 'react-icons/tb'
import { EditCardListingBtn } from '@/components/cards/listings/edit-card-listing-btn'

export const AllCardListings = ({ allListings }: { allListings: AllCardListingsT }) => {
  return (
    <>
      {allListings.map(async listing => (
        <section
          key={listing.listingGuid}
          className='flex items-center gap-2 justify-between border shadow rounded-lg px-2 py-3'
        >
          <div className='flex items-center gap-2'>
            <div className='relative size-12 max-w-12 max-h-12 rounded-full overflow-hidden p-6'>
              <Image
                src={ImageURL.listingImage(listing.listListingPhoto[0].listingImageSys)}
                alt={listing.listListingPhoto[0].listingImageOrg}
                className='rounded-full'
                fill
                priority
              />
            </div>
            <p className='truncate w-40 sm:w-56 md:w-40 lg:w-60 xl:w-full'>
              {listing.street + ', ' + listing.city + ', ' + listing.stateId + ', ' + listing.zipcode}
            </p>
          </div>
          <div className='flex items-center justify-between w-96'>
            <p>{listing.price}</p>
            <div className='gap-2 flex items-center'>
              <EditCardListingBtn listingData={listing}/>
              <Button variant='destructive' size='sm' className='gap-1'>
                <TbHomeX size={16} />
                Delete
              </Button>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
