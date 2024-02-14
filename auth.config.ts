import type { NextAuthConfig } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '@/schemas/auth-schema'
import axios, { AxiosResponse } from 'axios'

type User = {
  id: string
  name: string
  accessToken: string
  success: boolean
  errorMessage: string
}

async function fetchUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const response: AxiosResponse<User> = await axios({
      method: 'post',
      url: `${process.env.API_URL}/api/Auth/SignIn`,
      data: {
        userName: email,
        password: password
      }
    })
    const { data } = response
    if (!data || !data.success) return null
    return data
  } catch (error) {
    return null
  }
}

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (!validatedFields.success) return null
        const { email, password } = validatedFields.data
        const user = await fetchUser(email, password)
        return user?.success && user.accessToken !== null && user.name !== null
          ? user
          : null
      }
    })
  ]
} satisfies NextAuthConfig
