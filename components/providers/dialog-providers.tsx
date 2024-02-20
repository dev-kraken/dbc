'use client'

import { useEffect, useState } from 'react'

import { CreateUpdateCard } from '@/components/models/create-update-card-dialog'
import { SetAvatarSize } from '@/components/models/set-avatar-size'

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
      <SetAvatarSize />
    </>
  )
}