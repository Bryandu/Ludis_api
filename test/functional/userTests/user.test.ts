import { AuthService } from '@/services/auth'

describe('User functional tests', () => {
  it('should return 200 when token is valid', async done => {
    const token = AuthService.createToken({
      name: 'Bryan Willes',
      email: `animeronumero1@hotmail.com`,
      password: '12345678'
    })

    const { status } = await global.testRequest
      .get('/users')
      .set({ 'x-access-token': token })
    expect(status).toBe(200)
    done()
  })

  it('should get user by id', async done => {
    const user = {
      _id: '60783b541ce7865c0e7c4247',
      favorites: {
        friends: [],
        sports: [],
        places: []
      },
      name: 'Bryan Willes',
      email: 'animeronumero1@hotmail.com',
      password: '$2b$10$uFUaytw9A3COG0FIhaYAHuLjtavbZXlw2mkrqT9LXPQmqp7bNqVby',
      telephone: 35991721586,
      cpf: 12002002020,
      address: [],
      friends: [],
      PostsUserSchema: [],
      __v: 0
    }
    const token = AuthService.createToken({
      name: 'Bryan Willes',
      email: `animeronumero${Math.random()}@hotmail.com`,
      password: '12345678'
    })

    const response = await global.testRequest
      .get('/users/60783b541ce7865c0e7c4247')
      .set({ 'x-access-token': token })
    expect(response.body).toEqual(
      expect.objectContaining({ ...user, password: expect.any(String) })
    )
    done()
  })

  it('should return error status 422', async done => {
    const newUser = {
      name: 'Bryan Willes',
      password: '12345678',
      telephone: 35991721586,
      cpf: 12002002020,
      favorites: {
        friends: [],
        sports: [],
        places: []
      },
      friends: []
    }

    const response = await global.testRequest.post('/users').send(newUser)
    expect(response.status).toBe(422)
    done()
  })

  it('should get user by id throw error 404', async done => {
    const token = AuthService.createToken({
      name: 'Bryan Willes',
      email: `animeronumero${Math.random()}@hotmail.com`,
      password: '12345678'
    })
    const response = await global.testRequest
      .get('/users/60783b541ce7865c0e7c4248')
      .set({ 'x-access-token': token })
    expect(response.status).toBe(404)
    done()
  })

  it('should update address user', async done => {
    const address = {
      zipCode: 37045015,
      street: 'Rua Joaquim Aparecido Ferreira',
      number: 180,
      state: 'MG',
      district: 'Dos Carvalhos',
      city: 'Varginha',
      reference: null,
      country: 'Brasil'
    }
    const token = AuthService.createToken({
      name: 'Bryan Willes',
      email: `animeronumero${Math.random()}@hotmail.com`,
      password: '12345678'
    })
    const response = await global.testRequest
      .put('/users/address/60745c268ecb32feff0694ea')
      .set({ 'x-access-token': token })
      .send(address)
    expect(response.body).toEqual(expect.objectContaining(address))
    done()
  })

  it('should return status 409', async done => {
    const newUser = {
      name: 'Bryan Willes',
      email: 'animeronumero1@hotmail.com',
      password: '12345678',
      telephone: 35991721586,
      cpf: 12002002020,
      favorites: {
        friends: [],
        sports: [],
        places: []
      },
      friends: []
    }

    const response = await global.testRequest.post('/users').send(newUser)
    expect(response.status).toBe(409)
    done()
  })
})

describe('When authenticate', () => {
  it('should contain token', async done => {
    const newUser = {
      name: 'Bryan Willes',
      password: '12345678',
      email: 'animeronumero1@hotmail.com'
    }

    const response = await global.testRequest.post('/users/login').send(newUser)
    expect(response.body).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    )
    console.log(response.body)
    done()
  })

  it('should return error when password does not match', async done => {
    const newUser = {
      name: 'Bryan Willes',
      password: '12345679',
      email: 'animeronumero1@hotmail.com'
    }

    const response = await global.testRequest.post('/users/login').send(newUser)
    expect(response.body).toEqual({
      message: 'Unauthorized! Password does not match!',
      code: 401
    })
    done()
  })
})
