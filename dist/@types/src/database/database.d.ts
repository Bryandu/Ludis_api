import { Mongoose } from 'mongoose';
export declare const dbConect: () => Promise<Mongoose>;
export declare const dbClose: () => Promise<void>;
