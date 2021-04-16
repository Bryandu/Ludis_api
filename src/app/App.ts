import '../utils/module-alias'
import { UserController } from '../controllers/user.controller'
import { Application, json, urlencoded } from 'express'
import { Server } from '@overnightjs/core'
import { dbClose, dbConect } from '@/database/database'
import helmet from 'helmet'
import { Error } from 'mongoose'
import { get } from 'config'

export class SetupApp extends Server {
  constructor(private port = process.env.APP_PORT || get('App.port')) {
    super()
  }

  public async init(): Promise<void> {
    this.SetupExpress()
    this.SetupControllers()
    await this.SetupDatabase()
  }

  public async close(): Promise<void> {
    await dbClose()
  }

  private SetupExpress(): void {
    this.app.use(helmet())
    this.app.use(
      urlencoded({
        extended: true
      })
    )
    this.app.use(json())
  }

  private SetupControllers(): void {
    const userController = new UserController()
    this.addControllers([userController])
  }

  private async SetupDatabase(): Promise<void> {
    try {
      await dbConect()
    } catch (error) {
      throw new Error(error)
    }
  }

  public getApp(): Application {
    return this.app
  }

  public startApp(): void {
    this.app.listen(this.port, () => {
      console.info(`Server listening on port ${this.port}...`)
    })
  }
}
