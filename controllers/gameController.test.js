// Import the dependencies for testing
const chaiHttp = require('chai-http')

/** App exported from server.js */
const app = require('../server')
const chai = require('chai')
// const reversi = require('../othello-react/node_modules/reversi')

// const GameGameInstance = reversi.Game
// const game = new GameGameInstance()

// Configure chai
chai.use(chaiHttp)
chai.should()
describe('Game', () => {
  /** This will be updated after the POST test */
  let gameId = ''
  /** POST TEST
   * We insert a fake user in DB and we test
   * the properties of the response object
   */
  describe('POST /', () => {
    // Test to post a single contact
    it('should post contact', (done) => {
      const lastName = 'to'
      const firstName = 'ta'
      const data = {
        firstName,
        lastName
      }
      chai.request(app)
        .post('/rest/contacts/')
        .send(data)
        .end((_err, res) => {
          /** We update gameId with the new user _Id */
          gameId = String(res.body._id)
          /** We check the response status, type and properties */
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          res.body.should.have.property('firstName', firstName)
          res.body.should.have.property('lastName', lastName)
          done()
        })
    })
  })

  /** UPDATE TEST */
  describe('UPDATE /', () => {
    // Test to update single contact
    it('should update contact', (done) => {
      /** We use the POST test user _id */
      const id = gameId
      const lastName = 'toto'
      const firstName = 'tata'
      const data = {
        firstName,
        lastName
      }
      chai.request(app)
        .put(`/rest/contacts/update/${id}/`)
        .send(data)
        .end((_err, res) => {
          /** We check the response status, type and properties */
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id', id)
          res.body.should.have.property('firstName', firstName)
          res.body.should.not.have.property('firstName', 'ta')
          res.body.should.have.property('lastName', lastName)
          res.body.should.not.have.property('lastName', 'to')
          done()
        })
    })
  })

  /** GET test */
  describe('GET /', () => {
    // Test to get all contacts
    it('should get all contacts', (done) => {
      chai.request(app)
        .get('/rest/contacts/')
        .end((_err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.map(e => e.should.have.property('_id'))
          done()
        })
    })

    // Test to get single contact
    it('should get a single contact', (done) => {
      const id = gameId
      chai.request(app)
        .get(`/rest/contacts/find/${id}`)
        .end((_err, res) => {
          /** We check the response status, type and properties */
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id', id)
          res.body.should.have.property('firstName', 'tata')
          res.body.should.have.property('lastName', 'toto')
          done()
        })
    })
  })

  /** DELETE test
   * In this final test we delete the fake user created by the POST test
   */
  describe('DELETE /', () => {
    // Test to delete single contact
    it('should delete contact', (done) => {
      const id = gameId
      chai.request(app)
        .delete(`/rest/contacts/delete/${id}/`)
        .end((_err, res) => {
          /** We check the response status, type and properties */
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id', id)
          res.body.should.have.property('firstName', 'tata')
          res.body.should.have.property('lastName', 'toto')
          done()
        })
    })
  })
})
