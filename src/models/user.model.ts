import { User } from '@/@types/user.types'
import mongoose, { Document, Model, Schema } from 'mongoose'

const schema = (schema: object) => {
  return new Schema(schema)
}

const idSchema = schema({ id: String })
const badgesSchema = schema({
  badgeType: String,
  amount: Number,
  givenby: String
})
const postsUserSchema = schema({
  postDate: Date,
  postFiles: [String],
  description: String,
  localization: String,
  author: String,
  markings: [
    {
      users: [{ type: idSchema }],
      groups: [{ type: idSchema }],
      companies: [{ type: idSchema }]
    }
  ],
  badges: [
    { type: badgesSchema }
  ]
})
const nameSchema = schema({ name: String })
const friendsIdSchema = schema({ id: String })
const addressSchema = schema({
  zipCode: Number,
  street: String,
  number: Number,
  state: String,
  district: String,
  city: String,
  reference: String,
  country: String
})
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo: String,
  address: [{
    type: addressSchema
  }],
  telephone: Number,
  cpf: Number,
  favorites: {
    friends: [{ type: idSchema }],
    sports: [{ type: nameSchema }],
    places: [{ type: idSchema }]
  },
  friends: [{ type: friendsIdSchema }],
  singupDate: Date,
  PostsUserSchema: [{ type: postsUserSchema }]
})

export interface UserDocument extends Omit<User, '_id'>, Document {}

export const UserModel: Model<UserDocument> = mongoose.model('User', UserSchema)
