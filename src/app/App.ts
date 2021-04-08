import '../utils/module-alias'
import { UserController } from '../controllers/user.controller'
import express, { Application } from 'express'
import { Server } from '@overnightjs/core'

export class SetupApp extends Server {
  constructor (private port = 4000) {
    super()
  }

  public init (): void {
    this.SetupControllers()
    this.SetupExpress()
  }

  private SetupExpress (): void {
    this.app.use(express.json())
    this.app.listen(this.port, () => {
      console.log('App running...')
    })
  }

  private SetupControllers (): void {
    const userController = new UserController()
    this.addControllers([userController])
  }

  public getApp (): Application {
    return this.app
  }
}

new SetupApp().init()
