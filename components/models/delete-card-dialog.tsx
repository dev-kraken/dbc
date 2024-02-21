'use client'
import { DialogWrapper } from '@/components/models/model-wrapper'
import { useModal } from '@/hooks/use-dialog-store'
import { MdDelete } from 'react-icons/md'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScaleLoader } from 'react-spinners'
import React, { useState } from 'react'
import { deleteCard } from '@/action/card-action'
import toast from 'react-hot-toast'
import { DialogFormError } from '@/components/models/dialog-form-error'

export const DeleteCardDialog = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [isPending, startTransition] = React.useTransition()
  const [error, setError] = useState<string | undefined>('')
  const isModalOpen = isOpen && type === 'DeleteCard'

  const { deleteCard: cardInfo } = data

  const handelDelete = async () => {
    try {
      startTransition(async () => {
        await deleteCard(cardInfo?.cardID as string).then(data => {
          setError(data.error)
          if (data?.success) {
            toast.success('Card deleted successfully !')
            onClose()
          }
        })
      })
    } catch (error) {
      setError(error as string)
    }
  }

  const handelClose = () => {
    onClose()
  }
  return (
    <DialogWrapper open={isModalOpen} setOpen={handelClose}>
      <DialogWrapper open={isModalOpen} setOpen={handelClose}>
        <DialogContent className='sm:max-w-3xl overflow-hidden w-96'>
          <DialogHeader>
            <DialogTitle className='text-center text-xl font-bold'>Delete Card</DialogTitle>
            <DialogDescription className='text-center text-zinc-500'>
              Are you sure you want to delete this card?
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-3'>
            <p className='text-sm font-semibold'>
              Card Name: <span className='text-xl font-bold'>{cardInfo?.cardName}</span>
            </p>
            <DialogFormError message={error} />
          </div>
          <DialogFooter>
            <Button
              onClick={handelDelete}
              disabled={isPending}
              type='button'
              variant='destructive'
              size='sm'
              className='w-28'
            >
              <MdDelete size={16} className='mr-1' />
              {!isPending && <span>Delete Card</span>}
              <ScaleLoader loading={isPending} color='#FFFF' height={16} width={3} aria-label='Loading...' />
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogWrapper>
    </DialogWrapper>
  )
}
