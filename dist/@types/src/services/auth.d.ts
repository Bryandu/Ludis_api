/// <reference types="node" />
import { Secret, VerifyOptions } from 'jsonwebtoken';
import { User } from '@/@types/user.types';
export declare type DecodedUser = User;
export declare class AuthService {
    static hashPassword(password: string, salt?: number): Promise<string>;
    static comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    static createToken(payload: string | Record<string, unknown> | Buffer, secret?: Secret): string;
    static decodeToken(token: string, secreteKey?: Secret | string, options?: VerifyOptions): User;
}
