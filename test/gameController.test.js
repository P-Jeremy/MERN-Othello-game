
const request = require('supertest')
const app = require('../server')
const mongoose = require('mongoose')
const mongoConf = process.env.MONGO_CONFIG_URL

describe('Test the root path', () => {
  beforeAll(() => {
    mongoose
      .connect(mongoConf, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  })

  afterAll((done) => {
    mongoose.disconnect(done)
  })
  describe('Test the root path', () => {
    test('It should response the GET method', async () => {
      const response = await request(app).get('/api/game')
      expect(response.statusCode).toBe(200)
    })
  })
})
