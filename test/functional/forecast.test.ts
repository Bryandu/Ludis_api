import supertest from 'supertest'

describe('App test' () => {
    it('should App response 200', async () => {
        const {} = await supertest(app).get('./')
    });
})
