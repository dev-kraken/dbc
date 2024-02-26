'use server'

import * as z from 'zod'
import { LoginSchema, RegisterSchema } from '@/schemas/auth-schema'
import { signIn } from '@/auth'
import { DefaultLoginRedirect } from '@/routes'
import { AuthError } from 'next-auth'
import { AxiosWrapper } from '@/lib/axios-wrapper'
import { AxiosResponse } from 'axios'
import { ApiResponse } from '@/types/api-reponse'

export const login = async (values: z.infer<typeof LoginSchema>, callBackUrl?: string | null) => {
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
      redirectTo: callBackUrl || DefaultLoginRedirect
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

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }
  const { fName, lName, email, password } = validatedFields.data

  try {
    const response = await AxiosWrapper.normalPost<ApiResponse>('/api/Auth/SignUp', {
      firstName: fName,
      lastName: lName,
      email: email,
      emailConfirm: email,
      password: password,
      passwordConfirm: password
    })

    if (!response) {
      return { error: 'Something went wrong!' }
    }

    if (!response.success) {
      return { error: response.errorMessage }
    }

    return { success: 'Confirmation email sent!' }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

export const newVerification = async (token: string) => {
  try {
    const response = await AxiosWrapper.normalPost<ApiResponse>('/api/Auth/VerifyingAccount', {
      id: token
    })
    if (!response) {
      return { error: 'Something went wrong!' }
    }
    if (!response.success) {
      return { error: response.errorMessage }
    }
    return { success: 'Email verified!' }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}
