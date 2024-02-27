'use client'
import { DialogWrapper } from '@/components/models/model-wrapper'
import { useModal } from '@/hooks/use-dialog-store'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

export const AddUpdateCardListing = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [isPending, startTransition] = React.useTransition()
  const [error, setError] = useState<string | undefined>('')
  const isModalOpen = isOpen && type === 'AddUpdateCardListing'


  const handelClose = () => {
    onClose()
  }
  return (
    <DialogWrapper open={isModalOpen} setOpen={handelClose}>
      <DialogWrapper open={isModalOpen} setOpen={handelClose}>
        <DialogContent className='sm:max-w-3xl overflow-hidden w-96'>
          <DialogHeader>
            <DialogTitle className='text-center text-xl font-bold'>Add New Listing</DialogTitle>
            <DialogDescription className='text-center text-zinc-500'>
              Add listing information below given the inputs
            </DialogDescription>
          </DialogHeader>
          Form
          <DialogFooter>
            <Button>Add Listing</Button>
          </DialogFooter>
        </DialogContent>
      </DialogWrapper>
    </DialogWrapper>
  )
}
