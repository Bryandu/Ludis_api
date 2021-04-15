export type UserFavorites = {
  friends: [id: string]
  sports: [name: string]
  places: [id: string]
}
export interface UserAddress {
  postalCode: number
  street: string
  number: number
  federationUnity: string
  district: string
  city: string
  reference: string
  country: string
}
export interface User {
  id: string
  name: string
  email: string
  password: string
  address: UserAddress
  telephone: number
  cpf: number
  favorites: UserFavorites
}
