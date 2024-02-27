'use client'
import React, { useCallback, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScaleLoader } from 'react-spinners'
import AvatarResize from '@/components/upload-image/AvatarResize'
import { MdDelete } from 'react-icons/md'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { ProfileCard, ProfileCardBk } from '@/schemas/card-profile'
import { AvatarDropzone } from '@/components/upload-image/AvatarDropzone'
import { Textarea } from '@/components/ui/textarea'
import { addUpdateCardProfile } from '@/action/card-action'
import { CardProfileFormError } from '@/components/cards/card-profile/card-profile-form-error'
import { CardProfileFormSuccess } from '@/components/cards/card-profile/card-profile-form-success'
import { encode } from 'js-base64'
import { CardProfile } from '@/types/card'
import { ImageURL } from '@/data/images-url'
import { getImageFile } from '@/action/make-image'

interface CardProfileFormProps {
  cardID: string
  profileInfo: CardProfile
}

export const CardProfileForm = ({ cardID, profileInfo }: CardProfileFormProps) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [isImageChanged, setIsImageChanged] = useState<boolean>(true)

  const form = useForm<z.infer<typeof ProfileCard>>({
    resolver: zodResolver(ProfileCard),
    defaultValues: {
      cardProfile: [] as File[],
      profileName: profileInfo?.profileName || '',
      licenseNumber: profileInfo?.licenseNumber || '',
      subHeader: profileInfo?.subHeader || '',
      bio: profileInfo?.bio || ''
    }
  })

  useEffect(() => {
    if (profileInfo?.profileImagesysName) {
      getImageFile(ImageURL.profileImage(profileInfo?.profileImagesysName)).then(file => {
        if (file) {
          form.setValue('cardProfile', [file])
          setIsImageChanged(false)
        }
      })
    }
    setImage(ImageURL.profileImage(profileInfo?.profileImagesysName))
    setPreview(ImageURL.profileImage(profileInfo?.profileImagesysName))
  }, [form, image, profileInfo])


  const onSubmit = (values: z.infer<typeof ProfileCard>) => {
    setError('')
    setSuccess('')
    if (!image) {
      setError('Please set Card Profile image size')
      return
    }
    if (!cardID) {
      setError('Please reload the page')
      return
    }
    const cardProfile: z.infer<typeof ProfileCardBk> = {
      profileName: values.profileName,
      profileImageOrginalName: values.cardProfile?.[0].name,
      profileImageBase64: isImageChanged ? encode(image) : '',
      licenseNumber: values.licenseNumber,
      subHeader: values.subHeader,
      bio: values.bio,
      cardId: cardID
    }
    startTransition(() => {
      addUpdateCardProfile(cardProfile, profileInfo?.profileName ? 'update' : 'add').then(data => {
        if (data?.success) {
          setTimeout(() => {
            setSuccess('')
          }, 3000)
        }
        setSuccess(data?.success)
        setError(data?.error)
      })
    })
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
        form.clearErrors('cardProfile')
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  const handleCloseResize = useCallback(() => {
    setPreview('')
    setImage('')
    setError('')
    setIsImageChanged(true)
    form.resetField('cardProfile')
  }, [form])

  return (
    <Card className='w-full sm:w-7/12 md:w-9/12 lg:w-7/12 mx-auto mt-5'>
      <CardHeader>
        <CardTitle>Card Profile</CardTitle>
        <CardDescription>Update your profile details.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex flex-col items-center justify-center text-center'>
                {preview && !image && (
                  <AvatarResize
                    image={preview}
                    handleCloseResize={handleCloseResize}
                    setPreview={setPreview}
                    setImage={setImage}
                    setError={setError}
                  />
                )}
                {preview && image && (
                  <div className='relative mx-auto w-fit'>
                    <Avatar className='mx-auto size-36 border-purple-400 border shadow-md'>
                      <AvatarImage src={image} className='z-1' />
                      <AvatarFallback>Icon</AvatarFallback>
                    </Avatar>
                    <MdDelete
                      onClick={() => {
                        setImage('')
                        setPreview('')
                        setIsImageChanged(true)
                        form.resetField('cardProfile')
                        form.clearErrors()
                      }}
                      className='absolute right-4 top-0 z-10 size-6 cursor-pointer rounded-full bg-rose-500 p-1 text-white shadow-amber-100
                        hover:animate-pulse'
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
                          {!preview && (
                            <>
                              <FormLabel>Upload Profile Image</FormLabel>
                              <AvatarDropzone onDrop={onDrop} />
                            </>
                          )}
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
                name='profileName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='John Doe'
                        type='text'
                        autoComplete='fullname'
                        className='focus-visible:border-teal-500 focus-visible:ring-0'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='licenseNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='XX-0000-XX'
                        type='text'
                        className='focus-visible:border-teal-500 focus-visible:ring-0'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='subHeader'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Slogan</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='Real Estate Agent or Real Estate Broker'
                        type='text'
                        className='focus-visible:border-teal-500 focus-visible:ring-0'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='bio'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Tell us a little bit about yourself' className='resize-none' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardProfileFormError message={error} />
              <CardProfileFormSuccess message={success} />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={isPending} type='submit' variant='purpleButton' className='w-full'>
              {!isPending && <>{profileInfo?.profileName ? 'Update Profile' : 'Add Profile'}</>}
              <ScaleLoader loading={isPending} color='#A855F7' height={20} width={4} aria-label='Loading...' />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
