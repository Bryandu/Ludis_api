import { ViaCep } from './../clients/viaCep'
import { Response, Request } from 'express'
import { Controller, Get } from '@overnightjs/core'

@Controller('users')
export class UserController {
  @Get('')
  private async getAll (req: Request, res: Response) {
    const data = await new ViaCep().fetchCep(37045015)
    res.send(JSON.stringify(data))
  }
}
