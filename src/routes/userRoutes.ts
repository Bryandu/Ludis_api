import fs from 'fs'
import path from 'path'
import { Express, Request, Response } from 'express'

interface UserInfo {
    email: string;
    password: string;
    readonly id: string;
}

const db = path.join('src', 'database', 'db.json')

class User {
    data: any = []

    getUsers (): UserInfo[] | [] {
      this.data = fs.existsSync(db) ? fs.readFileSync(db) : []

      try {
        return JSON.parse(this.data)
      } catch (error) {
        return []
      }
    }

    saveUser (user: UserInfo[]) {
      fs.writeFileSync(db, JSON.stringify(user))
    }

    routeUser (app: Express) {
      app.route('/users/:id?').get((req: Request, res: Response) => {
        const users = this.getUsers()
        res.send(users)
      }).post((req: Request, res: Response) => {
        const users: UserInfo[] = this.getUsers()
        console.log(req.body)
        users.push(req.body)
        this.saveUser(users)
        res.status(201).send('ok')
      })
    }
}

export default new User()
