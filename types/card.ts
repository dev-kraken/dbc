export type CardProfile = {
  licenseNumber: string
  subHeader: string
  profileImageOrginalName: string
  profileImagesysName: string
  profileName: string
  bio: string
}

export type AllSocialMediaInputs = {
  id: number
  label: string
  icon: string
  type: string
  disable: boolean
  socialNetworkCategory: {
    id: number
    name: string
    priority: number
  }
  value?: string
}

export type UserSelectedSocialMedia = {
  id: number
  label: string
  type: string
  value?: string
}
