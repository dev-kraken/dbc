import React from 'react'
import { CardSocialMediaList } from '@/components/cards/social-media/card-social-media-list'
import { getAllSocialMediaInputs, getSelectedSocialMedia } from '@/action/card-action'

const SocialMedia = async ({ params }: { params: { cardID: string } }) => {
  const allSocialMediaInputs = await getAllSocialMediaInputs()
  const userSelectedSocialMedia = await getSelectedSocialMedia(params.cardID)
  return (
    <CardSocialMediaList
      allSocialMediaInputs={allSocialMediaInputs}
      userSelectedSocialMedia={userSelectedSocialMedia}
      cardID={params.cardID}
    />
  )
}

export default SocialMedia
