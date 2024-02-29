'use server'
import { AxiosWrapper } from '@/lib/axios-wrapper'
import * as z from 'zod'
import { revalidatePath } from 'next/cache'

import { AllCards } from '@/types/all-cards'
import { AddCardSchemaBk } from '@/schemas/add-card-schema'
import { ApiResponse } from '@/types/api-reponse'
import { decode } from 'js-base64'
import { ProfileCardBk } from '@/schemas/card-profile'
import { AllCardListings, AllSocialMediaInputs, CardListing, CardProfile, UserSelectedSocialMedia } from '@/types/card'
import { SocialMediaBK } from '@/schemas/social-media-schema'

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

export async function addUpdateCardProfile(values: z.infer<typeof ProfileCardBk>, isUpdate: string) {
  const validatedFields = ProfileCardBk.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields !'
    }
  }
  const { profileImageOrginalName, profileName, licenseNumber, subHeader, bio, profileImageBase64, cardId } =
    validatedFields.data
  try {
    const imageFilter = profileImageBase64 ? decode(profileImageBase64) : ''
    const response = await AxiosWrapper.post<ApiResponse>('/api/CardProfile/CardProfileSet', {
      profileImageOrginalName,
      profileName,
      licenseNumber,
      subHeader,
      bio,
      profileImageBase64: imageFilter,
      cardId
    })
    revalidatePath(`/dashboard/cards/[cardID]/card-profile`, 'page')
    if (response.success) {
      return {
        success: isUpdate === 'update' ? 'Card updated successfully !' : 'Card added successfully !'
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

export async function getCardProfile(cardID: string): Promise<CardProfile> {
  return await AxiosWrapper.get(`/api/CardProfile/CardProfileGet?cardGuid=${cardID}`)
}

export async function getAllSocialMediaInputs() {
  return await AxiosWrapper.get<AllSocialMediaInputs[]>('/api/SocialNetwork/SocialNetworkGetAll')
}

export async function getSelectedSocialMedia(cardID: string) {
  return await AxiosWrapper.get<UserSelectedSocialMedia[]>(
    `/api/CardSocialNetwork/CardSocialNetworkGetByCard?cardGuid=${cardID}`
  )
}

export async function addCardSocialMedia(values: z.infer<typeof SocialMediaBK>, isUpdate: boolean) {
  try {
    const validatedFields = SocialMediaBK.safeParse(values)
    if (!validatedFields.success) {
      return {
        error: 'Invalid fields !'
      }
    }
    revalidatePath('/dashboard/cards/[cardID]/social-media', 'page')
    const response = await AxiosWrapper.post<ApiResponse>('/api/CardSocialNetwork/CardSocialNetworkSet', values)
    if (response.success) {
      return {
        success: isUpdate ? 'Social media updated successfully !' : 'Social media added successfully !'
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

export async function addUpdateCardListing(values: any) {
  return await AxiosWrapper.post<ApiResponse>('/api/Listing/ListingAdd', values)
}

export async function getCardListings(cardID: string) {
  return await AxiosWrapper.get<AllCardListings>(`/api/Listing/ListingGetByCard?cardGuid=${cardID}`)
}

export async function getCardListingByGuid(listingGuid: string) {
  return await AxiosWrapper.get<CardListing>(`/api/Listing/ListingGetByGuid?guid=${listingGuid}`)
}