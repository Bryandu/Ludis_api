import { User } from '@/@types/user.types'
import mongoose, { Document, Model } from 'mongoose'

const idSchema = new mongoose.Schema({ id: String })
const nameSchema = new mongoose.Schema({ name: String })
const addressSchema = new mongoose.Schema({
  postalCode: Number,
  street: String,
  number: Number,
  federationUnity: String,
  district: String,
  city: String,
  reference: String,
  country: String
})
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    addressSchema
  },
  telephone: Number,
  cpf: Number,
  favorites: {
    friends: [idSchema],
    sports: [nameSchema],
    places: [idSchema]
  }
})

export interface UserDocument extends Omit<User, '_id'>, Document {}

export const UserModel: Model<UserDocument> = mongoose.model('User', UserSchema)
