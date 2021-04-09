import '../utils/module-alias'
import { UserController } from '../controllers/user.controller'
import { Application, json, urlencoded } from 'express'
import { Server } from '@overnightjs/core'
import { dbClose, dbConect } from '@/database/database'

export class SetupApp extends Server {
  constructor (private port = process.env.PORT || 4000) {
    super()
  }

  public async init (): Promise<void> {
    this.SetupExpress()
    this.SetupControllers()
    await this.SetupDatabase()
  }

  public async close (): Promise<void> {
    await dbClose()
  }

  private SetupExpress (): void {
    this.app.use(urlencoded({
      extended: true
    }))
    this.app.use(json())
    // this.app.listen(this.port, () => {
    //   console.log(`App listening on port ${this.port}...`)
    // })
  }

  private SetupControllers (): void {
    const userController = new UserController()
    this.addControllers([userController])
  }

  private async SetupDatabase (): Promise<void> {
    await dbConect()
  }

  public getApp (): Application {
    return this.app
  }
}

// const setup = new SetupApp()
// setup.init()
