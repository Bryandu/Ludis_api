import { SetupApp } from './../src/app/App'
import supertest from 'supertest'

let server = new SetupApp()
beforeAll(async done => {
  server = new SetupApp()
  await server.init()
  global.testRequest = supertest(server.getApp())
  done()
})

afterAll(async done => {
  await server.close()
  done()
})

jest.setTimeout(30000)
