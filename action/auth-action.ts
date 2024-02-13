'use server'
import { auth } from '@/auth'
import { Session } from 'next-auth'
import { fetchWrapper } from '@/lib/fetch-wrapper'

type RefreshTokenType = {
  accessToken: string
  success: boolean
}

export async function GetSession(): Promise<Session | null> {
  return await auth()
}

export async function GetTokenDBC(): Promise<string | null> {
  const session: Session | null = await auth()

  return session?.user?.accessToken ?? null
}

export const RefreshToken = async () => {
  const session: Session | null = await auth()
  const res = (await fetchWrapper.get(
    '/api/Auth/RefreshToken'
  )) as RefreshTokenType

  if (session && res.accessToken) {
    session.user.accessToken = res.accessToken
  }
  return session
}
