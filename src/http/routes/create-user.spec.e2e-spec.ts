import type { FastifyInstance } from 'fastify'
import request from 'supertest'

describe('Register (e2e)', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = (await import('@/http/server.js')).app

    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[POST] /users', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})