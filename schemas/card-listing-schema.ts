import * as z from 'zod'

export const CardListingSchema = z.object({
  street: z.string().min(1, {
    message: 'Street is required.'
  }),
  city: z.string().min(1, {
    message: 'City is required.'
  }),
  stateId: z.string().min(1, {
    message: 'State is required'
  }),
  zipcode: z.string().min(1, {
    message: 'Zip Code is required'
  }),
  propertyType: z.string().min(1, {
    message: 'Property Type is required'
  }),
  price: z.string().min(1, {
    message: 'Price is required'
  }),
  bedrooms: z.string().min(1, {
    message: 'Bedrooms is required'
  }),
  bathrooms: z.string().min(1, {
    message: 'Bathrooms is required'
  }),
  squareFootage: z.string().min(1, {
    message: 'Square Footage is required'
  }),
  lotSize: z.string().min(1, {
    message: 'Lot Size is required'
  }),
  yearBuilt: z.string().min(1, {
    message: 'Year Built is required'
  }),
  countryId: z.string().min(1, {
    message: 'Country is required'
  }),
  description: z.string().min(0),
  circle_image: z.any()
})