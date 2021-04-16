import { User } from '@/@types/user.types'
import { Schema, Document } from 'mongoose'

export interface UserDocument extends Omit<User, '_id'>, Document {}

export enum CustomDocuments {
  DUPLICATED = 'DUPLICATED'
}

export const schema = (schema: Record<string, unknown>): Schema => {
  return new Schema(schema)
}
