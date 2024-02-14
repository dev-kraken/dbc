'use server'

import * as z from 'zod'
import { LoginSchema } from '@/schemas/auth-schema'
import { signIn } from '@/auth'
import { DefaultLoginRedirect } from '@/routes'
import { AuthError } from 'next-auth'
import { AxiosWrapper } from '@/lib/axios-wrapper'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields !'
    }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DefaultLoginRedirect
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Invalid credentials !'
          }
        default: {
          return {
            error: 'Something went wrong !'
          }
        }
      }
    }
    throw error
  }
}
