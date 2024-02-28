const MainUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || ''
export const ImageURL = {
  cardImage: (cardImage: string) => {
    return `${MainUrl}/images/cardimages/${cardImage}`
  },
  profileImage: (profileImage: string) => {
    return `${MainUrl}/images/cardprofileimages/${profileImage}`
  },
  listingImage: (listingImage: string) => {
    return `${MainUrl}/images/ListingPhotoImages/${listingImage}`
  }
}
