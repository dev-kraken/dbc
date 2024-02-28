'use client'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-dialog-store'
import { MdOutlineAdd } from 'react-icons/md'
import React from 'react'

export const AddNewListingButton = ({cardID} : {cardID: string}) => {
  const { onOpen } = useModal()
  return (
    <div>
      <Button variant='purpleButton' onClick={() => onOpen('AddUpdateCardListing', {cardID})}>
        <MdOutlineAdd size={18} />
        Add New Listing
      </Button>
    </div>
  )
}
