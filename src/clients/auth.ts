import { compare, hash } from 'bcrypt'

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
}
