import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required')
})

export const RegisterSchema = z
  .object({
    fName: z.string().min(2, 'Name is required'),
    lName: z.string(),
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Password is required')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })
