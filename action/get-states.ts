'use server'
import { AxiosWrapper } from '@/lib/axios-wrapper'
import { AllStates } from '@/types/country-state'

export async function getCountryStates(countryID: string) {
  await new Promise(resolve => setTimeout(resolve, 500))
  return await AxiosWrapper.get<AllStates[]>(`/api/State/GetAllStateByCountry?countryId=${countryID}`)
}
