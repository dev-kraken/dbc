import { Base64 } from 'js-base64'
import * as z from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 5
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
export const ProfileCard = z.object({
  cardProfile: z
    .any()
    .refine(files => files?.[0], 'Card Profile is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 10MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .optional(),
  profileName: z.string().min(2, 'Profile name is required'),
  licenseNumber: z.string().min(3, 'License number is required'),
  subHeader: z.string().min(3, 'Slogan is required'),
  bio: z.string().min(3, 'Bio is required')
})

export const ProfileCardBk = z.object({
  profileImageBase64: z.string().refine(Base64.isValid, 'Invalid Image').optional(),
  profileImageOrginalName: z.string().min(1, 'Invalid image name'),
  profileName: z.string().min(2, 'Profile name is required'),
  licenseNumber: z.string().min(3, 'License number is required'),
  subHeader: z.string().min(3, 'Slogan is required'),
  bio: z.string().min(3, 'Bio is required'),
  cardId: z.string().min(5, 'Card id is required')
})
