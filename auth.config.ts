import type { NextAuthConfig } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '@/schemas/auth-schema'

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
    const response = await fetch(`${process.env.API_URL}/api/Auth/SignIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: email, password })
    })
    return await response.json()
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
