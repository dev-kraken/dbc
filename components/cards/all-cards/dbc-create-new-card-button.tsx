'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useModal } from '@/hooks/use-dialog-store'

export const DbcCreateNewCardButton = () => {
  const { onOpen } = useModal()
  return (
    <Button variant='outline' className='gap-2' onClick={() => onOpen('CreateUpdateCard')}>
      Add New Card
    </Button>
  )
}
