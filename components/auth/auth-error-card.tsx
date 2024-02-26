import { AuthCardWrapper } from '@/components/auth/auth-card-wrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export const AuthErrorCard = () => {
  return (
    <AuthCardWrapper
      label="Something went wrong. Please try again."
      headerLabel='Oops! Something went wrong.'
      backButtonLabel='Go back to Login'
      onBackButtonClick='/auth/login'
    >
      <div className='w-full flex justify-center items-center'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </AuthCardWrapper>
  )
}
