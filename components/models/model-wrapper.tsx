import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import React, { useEffect, useState } from 'react'

interface ModelWrapperProps {
  open: boolean
  setOpen: (value: boolean) => void | undefined
  modelTitle: string
  modelDescription?: string
  modelFooterButton: string
  children: React.ReactNode
}

export function DialogWrapper({
  open,
  setOpen,
  modelTitle,
  modelDescription,
  modelFooterButton,
  children
}: ModelWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[850px] overflow-hidden'>
        <DialogHeader>
          <DialogTitle className='text-center text-xl font-bold'>{modelTitle}</DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>{modelDescription}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button>{modelFooterButton}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
