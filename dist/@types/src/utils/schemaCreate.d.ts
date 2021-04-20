import { User } from '@/@types/user.types';
import { Schema, Document } from 'mongoose';
export interface UserDocument extends Omit<User, '_id'>, Document {
}
export declare enum CustomDocuments {
    DUPLICATED = "DUPLICATED"
}
export declare const schema: (schema: Record<string, unknown>) => Schema;
