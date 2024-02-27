'use client'
import React, { useEffect, useState, useTransition } from 'react'
import { AddSocialMedia } from '@/components/cards/social-media/add-social-media'
import { AllSocialMediaInputs, UserSelectedSocialMedia } from '@/types/card'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CardSocialMediaFormInputs } from '@/components/cards/social-media/card-social-media-form-inputs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { SocialMedia } from '@/schemas/social-media-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { DropResult } from '@hello-pangea/dnd'
import { addCardSocialMedia } from '@/action/card-action'
import { login } from '@/action/auth'
import { ScaleLoader } from 'react-spinners'
import toast from 'react-hot-toast'

interface CardSocialMediaListProps {
  allSocialMediaInputs: AllSocialMediaInputs[]
  userSelectedSocialMedia: UserSelectedSocialMedia[]
  cardID: string
}

export const CardSocialMediaList = ({
  allSocialMediaInputs,
  userSelectedSocialMedia,
  cardID
}: CardSocialMediaListProps) => {
  const [newSocialMediaInput, setNewSocialMediaInput] = useState<UserSelectedSocialMedia[] | []>(
    userSelectedSocialMedia
  )
  const [allSocialMediaInputButton, setAllSocialMediaInputButton] = useState<AllSocialMediaInputs[] | []>(
    allSocialMediaInputs
  )
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof SocialMedia>>({
    resolver: zodResolver(SocialMedia),
    defaultValues: {
      ...newSocialMediaInput.reduce(
        (acc, curr) => {
          acc[curr.label] = curr.value || ''
          return acc
        },
        {} as Record<string, string>
      )
    }
  })

  function onSubmit(values: z.infer<typeof SocialMedia>) {
    try {
      if (!Object.keys(values).length) {
        toast.error('Please add at least one social media link !')
        return
      }
      const data = newSocialMediaInput.map((input, index) => ({
        link: values[input.label] ?? '',
        priority: index,
        cardId: cardID,
        socialNetworkId: input.id
      }))
      startTransition(() => {
        addCardSocialMedia(data, !!userSelectedSocialMedia.length).then((data: any) => {
          if (data?.error) {
            toast.error(data?.error)
          }
          if (data?.success) {
            toast.success(data?.success)
          }
        })
      })
    } catch (error) {
      toast.error(error as string)
    }
  }

  const addNewSocialMediaInput = (socialMediaInput: AllSocialMediaInputs) => {
    const updateInputButton = allSocialMediaInputButton.map(item => {
      if (item.label === socialMediaInput.label) {
        return socialMediaInput
      }
      return item
    })
    setAllSocialMediaInputButton(updateInputButton)

    const { id, type, label, value } = socialMediaInput
    const newInput = { id, type, label, value }
    setNewSocialMediaInput([...newSocialMediaInput, newInput])
  }

  const deleteSocialMediaInput = (socialMediaInput: UserSelectedSocialMedia) => {
    form.unregister(socialMediaInput.label)
    const updateInputButton = allSocialMediaInputButton.map(item => {
      if (item.label === socialMediaInput.label) {
        return { ...item, disable: false, value: '' }
      }
      return item
    })
    setAllSocialMediaInputButton(updateInputButton)
    const updatedInputs = newSocialMediaInput.filter(input => input.label !== socialMediaInput.label)
    setNewSocialMediaInput(updatedInputs)
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items = [...newSocialMediaInput]
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setNewSocialMediaInput(items)
  }

  useEffect(() => {
    newSocialMediaInput.forEach(input => {
      if (input.value !== '') {
        form.setValue(input.label, input.value as string)
      }
    })

    const labelsToValues = new Map()
    newSocialMediaInput.forEach(item => {
      labelsToValues.set(item.label, item.value)
    })

    setAllSocialMediaInputButton(prevAllSocialMediaInputButton => {
      return prevAllSocialMediaInputButton.map(item => {
        if (labelsToValues.has(item.label)) {
          return { ...item, disable: true }
        }
        return item
      })
    })
  }, [form, newSocialMediaInput])
  return (
    <div className='grid grid-cols-3 gap-3'>
      <div className='col-span-2'>
        <Card className='w-full shadow-sm'>
          <CardHeader>
            <CardTitle>Selected Social Media</CardTitle>
            <CardDescription>Add Social Media Link to provided inputs</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className='flex flex-wrap gap-2 justify-center items-center'>
                <ScrollArea className='h-[70vh] w-full'>
                  <CardSocialMediaFormInputs
                    form={form}
                    inputs={newSocialMediaInput}
                    deleteSocialMediaInput={deleteSocialMediaInput}
                    onDragEnd={onDragEnd}
                  />
                  <ScrollBar orientation='vertical' />
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button disabled={isPending} type='submit' variant='purpleButton' className='w-full'>
                  {!isPending && userSelectedSocialMedia.length > 0 && 'Update Changes'}
                  {!isPending && userSelectedSocialMedia.length === 0 && 'Save Changes'}
                  <ScaleLoader loading={isPending} color='#FFFFFF' height={20} width={4} aria-label='Loading...' />
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
      <AddSocialMedia
        allSocialMediaInputs={allSocialMediaInputButton}
        addNewSocialMediaInput={addNewSocialMediaInput}
      />
    </div>
  )
}
