'use server'

import { AxiosWrapper } from '@/lib/axios-wrapper'

export async function getAllCards() {
  return await AxiosWrapper.get(`/api/Card/GetCardByUser`)
}
