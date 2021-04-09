import { Response, Request } from 'express'
import { Controller, Get, Post } from '@overnightjs/core'
import { UserModel } from '@/models/user.model'
import mongoose from 'mongoose'

@Controller('users')
export class UserController {
  @Get('')
  private async getAll (req: Request, res: Response): Promise<void> {
    res.send('JSON.stringify(data)').end()
  }

  @Post('')
  private async createUser (req: Request, res: Response) {
    try {
      const userModel = new UserModel(req.body)
      const result = await userModel.save()
      res.status(201).send(result).end()
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(422).end()
      } else {
        res.status(500).end()
      }
    }
    // console.log(req.body)
  }
}
