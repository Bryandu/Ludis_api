import { compare, hash } from 'bcrypt'
import jwt, { Secret, VerifyOptions } from 'jsonwebtoken'
import { get } from 'config'
import { User } from '@/@types/user.types'

export type DecodedUser = User

export class AuthService {
  static async hashPassword(password: string, salt = 10): Promise<string> {
    return await hash(password, salt)
  }

  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await compare(password, hashedPassword)
  }

  static createToken(
    payload: string | Record<string, unknown> | Buffer,
    secret: Secret = get('App.auth.key')
  ): string {
    const token = jwt.sign(payload, secret, {
      expiresIn: get('App.auth.expiresIn')
    })
    return token
  }

  static decodeToken(
    token: string,
    secreteKey: Secret | string = get('App.auth.key'),
    options?: VerifyOptions
  ): User {
    return jwt.verify(token, secreteKey, options) as User
  }
}
