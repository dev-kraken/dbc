import { CheckCircledIcon } from '@radix-ui/react-icons'

interface CardProfileFormSuccessProps {
  message?: string
}

export const CardProfileFormSuccess = ({ message }: CardProfileFormSuccessProps) => {
  if (!message) return null
  return (
    <div
      className='flex items-center gap-x-2 rounded-md
      bg-emerald-500/15 p-3 text-sm text-emerald-500'
    >
      <CheckCircledIcon className='size-4' />
      <p>{message}</p>
    </div>
  )
}
