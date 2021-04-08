import supertest from 'supertest'
import { SetupApp } from '../src/app/App'

beforeAll(done => {
  done()
  const server = new SetupApp()
  server.init()
  global.testRequest = supertest(server.getApp())
})

jest.setTimeout(30000)
