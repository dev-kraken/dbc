'use server'
import { AxiosWrapper } from '@/lib/axios-wrapper'
import * as z from 'zod'
import { revalidatePath } from 'next/cache'

import { AllCards } from '@/types/all-cards'
import { AddCardSchemaBk } from '@/schemas/add-card-schema'
import { ApiResponse } from '@/types/api-reponse'
import { decode } from 'js-base64'

export async function cardAddUpdate(values: z.infer<typeof AddCardSchemaBk>) {
  const validatedFields = AddCardSchemaBk.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields !'
    }
  }
  const { cardName, imageOriginalName, imageBase64 } = validatedFields.data

  try {
    const imageFilter = decode(imageBase64)
    const response = await AxiosWrapper.post<ApiResponse>('/api/Card/CardAdd', {
      cardName,
      imageOriginalName,
      imageBase64: imageFilter
    })
    revalidatePath('/dashboard/cards')
    if (response.success) {
      return {
        success: 'Card added successfully !'
      }
    }
    return {
      error: 'Something went wrong !'
    }
  } catch (error) {
    return {
      error: 'Something went wrong !'
    }
  }
}

export async function getAllCards(): Promise<AllCards[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return await AxiosWrapper.get<AllCards[]>(`/api/Card/GetCardByUser`)
}

export async function deleteCard(cardID: string) {
  await new Promise(resolve => setTimeout(resolve, 500))
  try {
    const response = await AxiosWrapper.post<ApiResponse>('/api/Card/CardDelete', { id: cardID })
    revalidatePath('/dashboard/cards')
    if (response.success) {
      return {
        success: 'Card added successfully !'
      }
    }
    return {
      error: 'Something went wrong !'
    }
  } catch (error) {
    return {
      error: 'Something went wrong !'
    }
  }
}
