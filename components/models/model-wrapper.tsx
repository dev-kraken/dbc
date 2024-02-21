import { Dialog } from '@/components/ui/dialog'
import React, { useEffect, useState } from 'react'

interface ModelWrapperProps {
  open: boolean
  setOpen: (value: boolean) => void | undefined
  children: React.ReactNode
}

export function DialogWrapper({ open, setOpen, children }: ModelWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
    </Dialog>
  )
}
