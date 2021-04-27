import mongoose from 'mongoose'
import { Response } from 'express'

export class ValidateError {
  protected sendResponseErrorValidade(
    res: Response,
    error: mongoose.Error.ValidationError | Error
  ): void {
    if (error instanceof mongoose.Error) {
      const response = this.validationResponse(error)
      res.status(response.code).send(response)
    } else {
      res.status(500).send('Something wrong!')
    }
  }

  private validationResponse(
    error: mongoose.Error.ValidationError
  ): { code: number; message: string } {
    const kindaError = Object.values(error.errors).filter(
      element => element.kind === 'DUPLICATED'
    )
    if (kindaError.length) {
      return { code: 409, message: error.message }
    } else {
      return { code: 422, message: error.message }
    }
  }
}
