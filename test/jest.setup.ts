import { SetupApp } from './../src/app/App'
import supertest from 'supertest'
import { UserModel } from '@/models/user.model'

const server = new SetupApp()
// const userModel = new UserModel()

beforeAll(async done => {
  await server.init()
  global.testRequest = supertest(server.getApp())
  done()
})

afterAll(async done => {
  await UserModel.deleteMany()
  await server.close()
  done()
})

jest.setTimeout(30000)
