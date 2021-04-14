import { Response, Request, NextFunction } from 'express'
import {
  ClassErrorMiddleware,
  Controller,
  Get,
  Post,
  Put
} from '@overnightjs/core'
import { UserModel } from '@/models/user.model'
import { errorMiddleware } from '@/middlewares/errors/error'
import { InternalError } from '@/utils/errors/internalError'
import { ValidateError } from '@/utils/errors/validateErrors'

@Controller('users')
@ClassErrorMiddleware(errorMiddleware)
export class UserController extends ValidateError {
  @Get('')
  private async getAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await UserModel.find()
      res.send(users)
    } catch (error) {
      next(new InternalError(error.message))
    }
  }

  @Get(':id')
  private async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
      return next(
        new InternalError(
          'User not found',
          404,
          'The user id canot be found in database'
        )
      )
    }
    res.send(user)
  }

  @Post('')
  private async createUser(req: Request, res: Response) {
    try {
      const userModel = new UserModel(req.body)
      const result = await userModel.save()
      res.status(201).send(result)
    } catch (error) {
      this.sendResponseErrorValidade(res, error)
    }
  }

  @Put('address/:id')
  private async updateAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params
    const response = await UserModel.updateOne(
      { _id: id },
      { address: req.body }
    )
    if (response.n) {
      console.log(response)
      res.send(req.body)
    } else {
      next(new InternalError('Address update failed'))
    }
  }
}
