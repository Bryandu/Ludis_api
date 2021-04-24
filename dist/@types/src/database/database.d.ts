import { Mongoose } from 'mongoose';
export declare const dbConnect: () => Promise<Mongoose>;
export declare const dbClose: () => Promise<void>;
