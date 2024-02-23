import React, { Suspense } from 'react'
import { CardProfileForm } from '@/components/cards/card-profile/card-profile-form'
import { getCardProfile } from '@/action/card-action'
import Loading from '@/app/(dash)/dashboard/cards/[cardID]/card-profile/loading'

const CardProfile = async ({ params }: { params: { cardID: string } }) => {
  const cardProfile = await getCardProfile(params.cardID)
  return (
    <div className='mt-4'>
      <Suspense fallback={<Loading />}>
        <CardProfileForm cardID={params.cardID} profileInfo={cardProfile} />
      </Suspense>
    </div>
  )
}

export default CardProfile
