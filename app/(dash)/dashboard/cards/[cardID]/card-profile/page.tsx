import React from 'react'

const CardProfile = ({ params }: { params: { cardID: string } }) => {
  return <div>Card Profile {params.cardID}</div>
}

export default CardProfile
