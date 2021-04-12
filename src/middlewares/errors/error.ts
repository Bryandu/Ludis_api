import { Err } from '@/@types/erros.types'
import { NextFunction, Request, Response } from 'express'

export function errorMiddleware (err: Err, _req: Request, res: Response, next: NextFunction) {
  res.status(err.code).json({
    message: err.message,
    code: err.code,
    description: err.description
  })
}
