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

export type ListingPhoto = {
  id: number;
  listingImageOrg: string;
  listingImageSys: string;
  isDefault: boolean;
};

export type CardListing = {
  listingGuid: string;
  street: string;
  city: string | null;
  propertyType: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  lotSize: string;
  yearBuilt: string;
  description: string;
  countryId: string;
  stateId: string;
  zipcode: string;
  cardGuid: string | null;
  status: boolean;
  listListingPhoto: ListingPhoto[];
};

export type AllCardListings = CardListing[];