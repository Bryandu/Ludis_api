import { schema } from '@/utils/schemaCreate'
import { Schema } from 'mongoose'

const badgesSchema = schema({
  badgeType: String,
  amount: Number,
  givenby: String
})

export const postsUserSchema = schema({
  postDate: Date,
  postFiles: [String],
  description: String,
  localization: String,
  author: String,
  markings: [
    {
      users: [{ type: Schema.Types.ObjectId }],
      groups: [{ type: Schema.Types.ObjectId }],
      companies: [{ type: Schema.Types.ObjectId }]
    }
  ],
  badges: [{ type: badgesSchema }]
})
