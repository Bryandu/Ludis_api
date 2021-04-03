import User from './routes/userRoutes'
import express, { Request, Response } from 'express'

const port = 4000
const app = express()

User.routeUser(app)
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello World!</h1>')
})

app.listen(port, () => {
  console.log('App running...')
})
