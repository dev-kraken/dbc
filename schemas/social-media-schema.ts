import * as z from 'zod'

export const SocialMedia = z.record(
  z.string({
    errorMap: issue => ({
      message: `${issue.path} is required.`
    })
  })
)

const SocialMediaObject = z.object({
  link: z.string().min(2, 'Link is required'),
  priority: z.number().min(0, 'Priority is required'),
  cardId: z.string().min(5, 'Card ID is required'),
  socialNetworkId: z.number().min(1, 'Social Network ID is required')
})
export const SocialMediaBK = z.array(SocialMediaObject)
