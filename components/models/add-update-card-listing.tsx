'use client'
import { DialogWrapper } from '@/components/models/model-wrapper'
import { useModal } from '@/hooks/use-dialog-store'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState, useTransition } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { CardListingSchema } from '@/schemas/card-listing-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '@/components/ui/input'
import { MdAddHome } from 'react-icons/md'
import { getCountryStates } from '@/action/get-states'
import { AllStates } from '@/types/country-state'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'

export const AddUpdateCardListing = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [countryStates, setCountryStates] = useState<AllStates[]>([])
  const [isPending, startTransition] = useTransition()
  const isModalOpen = isOpen && type === 'AddUpdateCardListing'
  const form = useForm({
    resolver: zodResolver(CardListingSchema),
    defaultValues: {
      countryId: '',
      city: '',
      street: '',
      description: '',
      stateId: '',
      zipcode: '',
      propertyType: '',
      price: '',
      yearBuilt: '',
      squareFootage: '',
      bedrooms: '',
      bathrooms: '',
      lotSize: '',
      circle_image: ''
    }
  })

  useEffect(() => {
    if (type && type === 'AddUpdateCardListing') {
      ;(async () => {
        const allStates = await getCountryStates((form.watch().countryId as string) || ('1' as string))
        setCountryStates(allStates)
      })()
    }
  }, [form, type])

  const onSubmit = async (values: z.infer<typeof CardListingSchema>) => {
    startTransition(() => {
      console.log(values)
    })
  }

  const handelClose = () => {
    onClose()
  }
  return (
    <DialogWrapper open={isModalOpen} setOpen={handelClose}>
      <DialogWrapper open={isModalOpen} setOpen={handelClose}>
        <DialogContent className='sm:max-w-3xl overflow-hidden w-7/12'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <DialogHeader>
                <DialogTitle className='text-center text-xl font-bold'>Add New Listing</DialogTitle>
                <DialogDescription className='text-center text-zinc-500'>
                  Add listing information below given the inputs
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-3'>
                <div className='grid grid-cols-5 gap-3'>
                  <div className='col-span-2'>
                    <FormField
                      control={form.control}
                      name='propertyType'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                            Property Type
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Property Type' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='1'>Home</SelectItem>
                              <SelectItem value='2'>TownHome</SelectItem>
                              <SelectItem value='3'>Multi-Family</SelectItem>
                              <SelectItem value='4'>Condos/Co-ops</SelectItem>
                              <SelectItem value='5'>Lots/Land</SelectItem>
                              <SelectItem value='6'>Apartments</SelectItem>
                              <SelectItem value='7'>Manufactured</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            className='text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='$0.00'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='yearBuilt'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Year Built
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            className='text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='2024'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='squareFootage'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Square Footage
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            className='text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='0'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid grid-cols-4 gap-3'>
                  <FormField
                    control={form.control}
                    name='bedrooms'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Bedrooms
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Bedrooms' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='1'>1</SelectItem>
                            <SelectItem value='2'>2</SelectItem>
                            <SelectItem value='3'>3</SelectItem>
                            <SelectItem value='4'>4</SelectItem>
                            <SelectItem value='5'>5</SelectItem>
                            <SelectItem value='6'>6</SelectItem>
                            <SelectItem value='7'>7</SelectItem>
                            <SelectItem value='8'>8</SelectItem>
                            <SelectItem value='9'>9</SelectItem>
                            <SelectItem value='10'>10</SelectItem>
                            <SelectItem value='11'>Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='bathrooms'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Bathrooms
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Bathrooms' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='1'>1</SelectItem>
                            <SelectItem value='2'>2</SelectItem>
                            <SelectItem value='3'>3</SelectItem>
                            <SelectItem value='4'>4</SelectItem>
                            <SelectItem value='5'>5</SelectItem>
                            <SelectItem value='6'>6</SelectItem>
                            <SelectItem value='7'>Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormField
                      control={form.control}
                      name='lotSize'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                            Lot Size
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              className='text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                              placeholder='Lot Size'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='countryId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Country
                        </FormLabel>
                        <Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Country' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='1'>United States</SelectItem>
                            <SelectItem value='2'>Canada</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid grid-cols-6 gap-3'>
                  <div className='col-span-2'>
                    <FormField
                      control={form.control}
                      name='street'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                            Street
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              className='text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                              placeholder='Enter Street'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='col-span-2'>
                    <FormField
                      control={form.control}
                      name='city'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                            City
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              className='text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                              placeholder='Enter City'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name='stateId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                            State
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='State' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <ScrollArea className='h-72 w-48'>
                                {countryStates.map(state => (
                                  <SelectItem key={state.id} value={state.id.toString()}>
                                    {state.name}
                                  </SelectItem>
                                ))}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name='zipcode'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                            Zip Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              className='text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                              placeholder='10001'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                            Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a bit about your listing"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant='purpleButton' size='sm' className='gap-1'>
                  <MdAddHome size={16} />
                  Add Listing
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </DialogWrapper>
    </DialogWrapper>
  )
}
