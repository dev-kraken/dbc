'use server'

import { AxiosWrapper } from '@/lib/axios-wrapper'
import { AllCards } from '@/types/all-cards'

export async function getAllCards(): Promise<AllCards[]> {
  return await AxiosWrapper.get<AllCards[]>(`/api/Card/GetCardByUser`)
}
