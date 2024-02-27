'use client'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-dialog-store'

export const AddNewListingButton = () => {
  const { onOpen } = useModal()
  return (
    <div>
      <Button variant='purpleButton' onClick={() => onOpen('AddUpdateCardListing')}>
        Add New Listing
      </Button>
    </div>
  )
}
