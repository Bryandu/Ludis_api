import { Response, Request, NextFunction } from 'express'
import { ClassErrorMiddleware, Controller, Get, Post } from '@overnightjs/core'
import { UserModel } from '@/models/user.model'
import mongoose from 'mongoose'
import { errorMiddleware } from '@/middlewares/errors/error'
import { InternalError } from '@/utils/errors/internalError'

@Controller('users')
@ClassErrorMiddleware(errorMiddleware)
export class UserController {
  @Get('')
  private async getAll (req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.find()
      res.send(users).end()
    } catch (error) {
      res.send(error).end()
    }
  }

  @Get(':id')
  private async getUserById (req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = await UserModel.findById(req.params.id)
    user && res.send(user)

    if (!user) {
      next(new InternalError('User not found', 404, 'The user id canot be found in database'))
    }
  }

  @Post('')
  private async createUser (req: Request, res: Response, next: NextFunction) {
    try {
      const userModel = new UserModel(req.body)
      const result = await userModel.save()
      res.status(201).send(result).end()
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new InternalError(error.message, 422, error.name))
      } else {
        next(new InternalError(error.message))
      }
    }
  }
}
