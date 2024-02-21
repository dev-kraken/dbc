'use client'

import { useEffect, useState } from 'react'

import { CreateUpdateCard } from '@/components/models/create-update-card-dialog'
import { DeleteCardDialog } from '@/components/models/delete-card-dialog'

export const DialogProviders = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateUpdateCard />
      <DeleteCardDialog />
    </>
  )
}
