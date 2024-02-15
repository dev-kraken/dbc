const MainUrl = process.env.CARD_IMG_URL
export const ImageURL = {
  cardImage: (cardImage: string) => {
    return `${MainUrl}${cardImage}`
  }
}
