'use server'
import { auth } from '@/auth'
import { Session } from 'next-auth'
import { AxiosWrapper } from '@/lib/axios-wrapper'

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
  const res = (await AxiosWrapper.get(
    '/api/Auth/RefreshToken'
  )) as unknown as RefreshTokenType

  if (session && res.accessToken) {
    session.user.accessToken = res.accessToken
  }
  return session
}
