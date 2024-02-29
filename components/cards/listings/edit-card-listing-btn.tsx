'use client'
import { TbHomeEdit } from 'react-icons/tb'
import { Button } from '@/components/ui/button'
import { CardListing } from '@/types/card'
import { useModal } from '@/hooks/use-dialog-store'

export const EditCardListingBtn = ({ listingData }: { listingData: CardListing }) => {
  const { onOpen } = useModal()
  return (
    <Button
      onClick={() => onOpen('AddUpdateCardListing', { listingData })}
      variant='purpleButton'
      size='sm'
      className='gap-1'
    >
      <TbHomeEdit size={16} />
      Edit
    </Button>
  )
}
