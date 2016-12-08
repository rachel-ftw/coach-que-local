const {expect, app, chai} = require('../setup')

describe('Home & User', () => {
  describe('GET homepage /', () => {
    it('should return object with title property', done => {
      chai.request(app)
        .get('/')
        .end((error, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('title').eql('Express')
          done()
        })
    })
  })
  describe('GET users at /users', () => {
    it('should return object with title property', done => {
      chai.request(app)
        .get('/users')
        .end((error, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('status').eql('success')
          done()
        })
    })
  })
})