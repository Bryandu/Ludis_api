import { User } from '@/@types/user.types'
import mongoose, { Document, Model, Schema } from 'mongoose'

const schema = (schema: object) => {
  return new Schema(schema)
}

const PostsUserSchema = schema({
  postDate: Date
})
const idSchema = schema({ id: String })
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
  address: {
    addressSchema
  },
  telephone: Number,
  cpf: Number,
  favorites: {
    friends: [idSchema],
    sports: [nameSchema],
    places: [idSchema]
  },
  friends: [friendsIdSchema],
  singupDate: Date,
  PostsUserSchema: { type: PostsUserSchema }
})

export interface UserDocument extends Omit<User, '_id'>, Document {}

export const UserModel: Model<UserDocument> = mongoose.model('User', UserSchema)
