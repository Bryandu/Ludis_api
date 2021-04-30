import { AuthService } from '@/services/auth'
import mongoose, { Model, Schema } from 'mongoose'
import { schema, CustomDocuments, UserDocument } from '@/utils/schemaCreate'
import { postsUserSchema } from './post.model'

const addressSchema = schema({
  zipCode: Number,
  street: String,
  number: Number,
  state: String,
  district: String,
  city: String,
  reference: String,
  country: String,
  created_at: {
    type: Date,
    default: Date.now
  }
})
const UserSchema = schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email must be unique']
  },
  password: { type: String, required: true },
  photo: String,
  address: [
    {
      type: addressSchema
    }
  ],
  telephone: Number,
  cpf: Number,
  favorites: {
    friends: [{ type: Schema.Types.ObjectId }],
    sports: [{ type: Schema.Types.ObjectId }],
    places: [{ type: Schema.Types.ObjectId }]
  },
  friends: [{ type: Schema.Types.ObjectId }],
  create_at: { type: Date, default: Date.now() },
  PostsUserSchema: [{ type: postsUserSchema, ref: 'PostsUser' }]
})

UserSchema.path('email').validate(
  async (email: string) => {
    const emailCount = await mongoose.models.User.countDocuments({ email })
    return !emailCount
  },
  'Already exists in the database',
  CustomDocuments.DUPLICATED
)

UserSchema.pre<UserDocument>('save', async function (): Promise<void> {
  if (this.password || !this.isModified('password')) {
    try {
      const hashedPassword = await AuthService.hashPassword(this.password)
      this.password = hashedPassword
    } catch (error) {
      console.error(`Error hashing the password for the user ${this.name}`)
    }
  }
})

export const UserModel: Model<UserDocument> = mongoose.model('User', UserSchema)
