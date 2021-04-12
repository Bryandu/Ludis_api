describe('User functional tests', () => {
  it('should return 200', async (done) => {
    const { status } = await global.testRequest.get('/users')
    expect(status).toBe(200)
    done()
  })
  it('should create user', async (done) => {
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
      }
    }

    const response = await global.testRequest.post('/users').send(newUser)
    expect(response.status).toBe(201)
    expect(response.body).toEqual(expect.objectContaining(newUser))
    done()
  })

  it('should get user by id', async (done) => {
    const user = {
      _id: '60720ce33a2f066132a3d046',
      favorites: {
        friends: [],
        sports: [],
        places: []
      },
      name: 'Luciana Medes',
      email: 'lucianamedes@gamail.com',
      password: '12345678',
      friends: [],
      __v: 0
    }

    const response = await global.testRequest.get('/users/60720ce33a2f066132a3d046')
    expect(response.body).toEqual(expect.objectContaining(user))
    done()
  })

  it('should return error status 422', async (done) => {
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

  it('should get user by id throw error 404', async (done) => {
    const response = await global.testRequest.get('/users/60720ce33a2f066132a3d067')
    expect(response.status).toBe(404)
    done()
  })
})
