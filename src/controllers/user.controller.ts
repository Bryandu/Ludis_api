import { Response, Request, NextFunction } from 'express'
import {
  ClassErrorMiddleware,
  Controller,
  Get,
  Middleware,
  Post,
  Put
} from '@overnightjs/core'
import { UserModel } from '@/models/user.model'
import { errorMiddleware } from '@/middlewares/errors/error'
import { InternalError } from '@/utils/errors/internalError'
import { ValidateError } from '@/utils/errors/validateErrors'
import { AuthService } from '@/services/auth'
import { authMiddleware } from '@/middlewares/auth/auth.middleware'

@Controller('users')
@ClassErrorMiddleware(errorMiddleware)
export class UserController extends ValidateError {
  @Get('')
  @Middleware(authMiddleware)
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
  @Middleware(authMiddleware)
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
          'The user id cannot be found in database'
        )
      )
    }
    res.send(user)
  }

  @Post('login')
  private async authenticateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user = await UserModel.findOne({
      email: req.body.email
    })
    if (!user) {
      return next(new InternalError('User not found!', 404))
    }
    if (
      !(await AuthService.comparePassword(req.body.password, user.password))
    ) {
      return next(
        new InternalError('Unauthorized! Password does not match!', 401)
      )
    }
    const token = AuthService.createToken(user.toJSON())
    res.status(200).send({
      user,
      token: token
    })
  }

  @Post('')
  private async createUser(req: Request, res: Response) {
    const { email } = req.body
    const userModel = new UserModel(req.body)
    try {
      const user = await UserModel.findOne({ email })
      if (!user) {
        const result = await userModel.save()
        res.status(201).send(result)
      } else {
        res.status(409).send({
          code: 409,
          message: 'Email already exists!'
        })
      }
    } catch (error) {
      this.sendResponseErrorValidade(res, error)
    }
  }

  @Put('address/:id')
  @Middleware(authMiddleware)
  private async updateAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params
    if (req.body !== {}) {
      try {
        await UserModel.updateOne({ _id: id }, { $push: { address: req.body } })
        res.send(req.body)
      } catch (error) {
        next(new InternalError(error.message))
      }
    } else {
      next(new InternalError('Address required!', 415))
    }
  }
}
