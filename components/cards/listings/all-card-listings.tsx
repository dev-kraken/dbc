import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Image from 'next/image'
import { AllCardListings as AllCardListingsT } from '@/types/card'
import { ImageURL } from '@/data/images-url'

export const AllCardListings = ({ allListings }: { allListings: AllCardListingsT }) => {
  return (
    <Table>
      <TableCaption>A list of your recent listings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-96'>Name (Built-in)</TableHead>
          <TableHead>Contract Type</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className='text-right'>Home Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allListings.map(async listing=>(
          <TableRow key={listing.listingGuid}>
            <TableCell className='font-medium flex items-center gap-2'>
              <div className='relative size-12 rounded-full'>
                <Image src={ImageURL.listingImage(listing.listListingPhoto[0].listingImageSys)} alt='asd' className='rounded-full' fill />
              </div>
              <div>{listing.street + ', ' + listing.city + ', ' + listing.stateId + ', ' + listing.zipcode}</div>
            </TableCell>
            <TableCell>{listing.yearBuilt}</TableCell>
            <TableCell>{listing.price}</TableCell>
            <TableCell className='text-right'>{listing.propertyType}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
