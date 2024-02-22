'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useModal } from '@/hooks/use-dialog-store'
import { MdOutlineAdd } from 'react-icons/md'

export const DbcCreateNewCardButton = () => {
  const { onOpen } = useModal()
  return (
    <Button variant='purpleButton' className='gap-1' onClick={() => onOpen('CreateUpdateCard')}>
      <MdOutlineAdd size={18} />
      Add New Card
    </Button>
  )
}
