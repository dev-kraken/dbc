'use client'

import { useEffect, useState } from 'react'

import { useModal } from '@/hooks/use-dialog-store'
import { DialogWrapper } from '@/components/models/model-wrapper'

export const CreateUpdateCard = () => {
  const [isMounted, setIsMounted] = useState(false)

  const { isOpen, onClose, type } = useModal()
  const isModalOpen = isOpen && type === 'CreateUpdateCard'

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handelClose = () => {
    onClose()
  }

  if (!isMounted) {
    return null
  }

  return (
    <DialogWrapper
      open={isModalOpen}
      setOpen={handelClose}
      modelTitle='Customize your Digital Card'
      modelDescription='Give your card a personality with a name and an image. You can always change it later.'
      modelFooterButton='Save changes'
    >
      <h1>Form will go here</h1>
    </DialogWrapper>
  )
}
