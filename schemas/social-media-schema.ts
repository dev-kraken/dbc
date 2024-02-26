import * as z from 'zod'

export const SocialMedia = z.record(
  z.string({
    errorMap: issue => ({
      message: `${issue.path} is required.`
    })
  })
)
