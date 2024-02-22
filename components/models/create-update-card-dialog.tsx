'use client'

import React, { useState, useTransition } from 'react'

import { useModal } from '@/hooks/use-dialog-store'
import { DialogWrapper } from '@/components/models/model-wrapper'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AddCardSchema } from '@/schemas/add-card-schema'
import * as z from 'zod'

import { MdDelete } from 'react-icons/md'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IoAddOutline } from 'react-icons/io5'
import { DialogFormError } from '@/components/models/dialog-form-error'
import { encode } from 'js-base64'
import { cardAddUpdate } from '@/action/card-action'
import toast from 'react-hot-toast'
import { AvatarDropzone } from '@/components/upload-image/AvatarDropzone'
import AvatarResize from '@/components/upload-image/AvatarResize'
import { cn } from '@/lib/utils'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScaleLoader } from 'react-spinners'

export const CreateUpdateCard = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')

  const { isOpen, onClose, type } = useModal()
  const isModalOpen = isOpen && type === 'CreateUpdateCard'

  const form = useForm({
    resolver: zodResolver(AddCardSchema),
    defaultValues: {
      name: '',
      cardProfile: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof AddCardSchema>) => {
    setError('')
    startTransition(async () => {
      try {
        if (!image) {
          setError('Please set Card Profile image size')
          return
        }
        const cardAdd = {
          cardName: values.name,
          imageOriginalName: values.cardProfile?.[0].name,
          imageBase64: encode(image)
        }
        cardAddUpdate(cardAdd).then(data => {
          setError(data?.error)
          if (data?.success) {
            toast.success('Card added successfully !')
            setPreview('')
            setImage('')
            form.reset()
            onClose()
          }
        })
      } catch (error) {
        setError(error as string)
      }
    })
  }

  const handelClose = () => {
    setPreview('')
    setImage('')
    form.reset()
    onClose()
  }

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => {
        console.log('file reading has failed')
      }
      reader.onload = () => {
        form.setValue('cardProfile', [file] as unknown as string)
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <DialogWrapper open={isModalOpen} setOpen={handelClose}>
      <DialogContent className='sm:max-w-3xl overflow-hidden w-96'>
        <DialogHeader>
          <DialogTitle className='text-center text-xl font-bold'>Add New Card</DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Give your card a personality with a name and an image. You can always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-4'>
              <div className='flex flex-col items-center justify-center text-center'>
                {preview && !image && (
                  <AvatarResize image={preview} setPreview={setPreview} setImage={setImage} setError={setError} />
                )}
                {preview && image && (
                  <div className='relative mx-auto w-fit'>
                    <Avatar className='mx-auto size-28 border-purple-400 border shadow-md'>
                      <AvatarImage src={image} className='z-1' />
                      <AvatarFallback>Icon</AvatarFallback>
                    </Avatar>
                    <MdDelete
                      onClick={() => {
                        setPreview('')
                        setImage('')
                        form.resetField('cardProfile')
                        form.clearErrors()
                      }}
                      className='absolute right-1 top-0 z-10 size-6 cursor-pointer rounded-full bg-rose-500 p-1 text-white shadow-amber-100'
                    />
                  </div>
                )}
                <FormField
                  control={form.control}
                  name='cardProfile'
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          {!preview && <AvatarDropzone onDrop={onDrop} />}
                          <Input disabled={isPending} type='file' className='hidden' {...rest} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs text-zinc-500 dark:text-secondary/70'>Card Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className='border-purple-300 text-black focus-visible:border-purple-500 focus-visible:ring-purple-400/50'
                        placeholder='Enter card name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFormError message={error} />
            <DialogFooter>
              <Button disabled={isPending} type='submit' variant='purpleButton' size='sm' className='w-28'>
                {!isPending && <IoAddOutline size={16} className='mr-1' />}
                {!isPending && <span>Add Card</span>}
                <ScaleLoader loading={isPending} color='#FFFF' height={16} width={3} aria-label='Loading...' />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </DialogWrapper>
  )
}
