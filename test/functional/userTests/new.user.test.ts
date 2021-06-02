import { AuthService } from '@/services/auth'

describe('Create user', () => {
  it('should create user', async done => {
    const newUser = {
      name: 'Bryan Willes',
      email: `animeronumero1@hotmail.com`,
      password: '12345678'
    }

    const response = await global.testRequest.post('/users').send(newUser)
    expect(response.status).toBe(201)
    await expect(
      AuthService.comparePassword(newUser.password, response.body.password)
    ).resolves.toBeTruthy()
    expect(response.body).toEqual(
      expect.objectContaining({ ...newUser, password: expect.any(String) })
    )
    done()
  })

  it('should return 409 when user already exists', async done => {
    const user = {
      name: 'Bryan Willes',
      password: '12345678',
      email: 'animeronumero1@hotmail.com'
    }

    const response = await global.testRequest.post('/users').send(user)
    expect(response.body).toEqual({
      code: 409,
      message: 'Email already exists!'
    })
    done()
  })
})
