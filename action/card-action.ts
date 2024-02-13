'use server'

import { fetchWrapper } from '@/lib/fetch-wrapper'

export async function getAllCards() {
  return await fetchWrapper.get(`/api/Card/GetCardByUser`)
}
