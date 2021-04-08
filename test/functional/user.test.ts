describe('user route', () => {
  it('should return 200', async (done) => {
    const { status } = await global.testRequest.get('/users')
    expect(status).toBe(200)
    done()
  })
})
