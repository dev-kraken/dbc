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
import { cn } from '@/lib/utils'
import { ScaleLoader } from 'react-spinners'
import { IconType } from 'react-icons'

interface ModelWrapperProps {
  open: boolean
  setOpen: (value: boolean) => void | undefined
  modelTitle: string
  modelDescription?: string
  modelFooterButton: string
  FooterButtonIcon?: IconType | undefined
  modelWidth?: string
  formID: string
  isPending: boolean
  children: React.ReactNode
}

export function DialogWrapper({
  open,
  setOpen,
  modelTitle,
  modelDescription,
  modelFooterButton,
  modelWidth,
  formID,
  isPending,
  FooterButtonIcon,
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
      <DialogContent className={cn(modelWidth, 'sm:max-w-3xl overflow-hidden')}>
        <DialogHeader>
          <DialogTitle className='text-center text-xl font-bold'>{modelTitle}</DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>{modelDescription}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button form={formID} disabled={isPending} type='submit' variant='default' size='sm' className='w-28'>
            {!isPending && FooterButtonIcon && <FooterButtonIcon size={16} className='mr-1' />}
            {!isPending && <span>{modelFooterButton}</span>}
            <ScaleLoader loading={isPending} color='#FFFF' height={16} width={3} aria-label='Loading...' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
