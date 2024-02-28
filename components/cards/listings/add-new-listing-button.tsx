'use client'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-dialog-store'
import { MdOutlineAdd } from 'react-icons/md'
import React from 'react'

export const AddNewListingButton = () => {
  const { onOpen } = useModal()
  return (
    <div>
      <Button variant='purpleButton' onClick={() => onOpen('AddUpdateCardListing')}>
        <MdOutlineAdd size={18} />
        Add New Listing
      </Button>
    </div>
  )
}
