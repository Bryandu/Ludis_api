import { DecodedUser } from '@/services/auth'
import { IncomingMessage } from 'http'

declare module 'express-serve-static-core' {
  export interface Request extends IncomingMessage, Request {
    decoded?: DecodedUser
  }
}
