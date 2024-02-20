'use client'

import { useState, useTransition } from 'react'

import { useModal } from '@/hooks/use-dialog-store'
import { DialogWrapper } from '@/components/models/model-wrapper'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AddCardSchema } from '@/schemas/add-card-schema'
import * as z from 'zod'
import { GetImageData, ImgToBase64 } from '@/action/make-image'
import { IoIosCloudUpload } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IoAddOutline } from 'react-icons/io5'
import { cn } from '@/lib/utils'
import { DialogFormError } from '@/components/models/dialog-form-error'
import { encode } from 'js-base64'
import { cardAddUpdate } from '@/action/card-action'
import toast from 'react-hot-toast'
import { AvatarResize } from '@/components/resize-image/avatar-resize'

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
        const imageFile = values.cardProfile?.[0]
        if (!imageFile) {
          new Error('Upload your icon.')
        }
        const base64Image = await ImgToBase64(imageFile)
        const cardAdd = {
          cardName: values.name,
          imageOriginalName: values.cardProfile?.[0].name,
          imageBase64: encode(base64Image)
        }
        cardAddUpdate(cardAdd).then(data => {
          setError(data?.error)
          if (data?.success) {
            toast.success('Card added successfully !')
            setPreview('')
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
  return (
    <DialogWrapper
      modelWidth='w-96'
      open={isModalOpen}
      setOpen={handelClose}
      modelTitle='Add New Card'
      modelDescription='Give your card a personality with a name and an image. You can always change it later.'
      modelFooterButton='Add Card'
      formID='add-card'
      isPending={isPending}
      FooterButtonIcon={IoAddOutline}
    >
      <Form {...form}>
        <form id='add-card' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-4'>
            <div className='flex flex-col items-center justify-center text-center'>
              {preview && !image && <AvatarResize image={preview} setPreview={setPreview} setImage={setImage} />}
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
                    <FormControl className={cn(preview && 'hidden')}>
                      <div className='flex items-center justify-center w-80'>
                        <label
                          htmlFor='dropzone-file'
                          className='flex flex-col items-center justify-center w-full h-24 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer
                            bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-purple-100/20'
                        >
                          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                            <IoIosCloudUpload size={26} className='text-purple-500' />
                            <p className='mb-2 text-sm text-purple-400'>
                              <span className='font-semibold'>Click to upload</span>
                            </p>
                            <p className='text-xs text-gray-500'>JPG, JPEG, PNG WEBP</p>
                          </div>
                          <Input
                            id='dropzone-file'
                            type='file'
                            className='hidden'
                            {...rest}
                            onChange={async event => {
                              const { files, displayUrl } = await GetImageData(event)
                              setPreview(displayUrl)
                              onChange(files)
                            }}
                          />
                        </label>
                      </div>
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
        </form>
      </Form>
    </DialogWrapper>
  )
}
