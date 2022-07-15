import chai from 'chai'
import chaiHttp = require('chai-http');
import app from '../../app'
import { IEvent } from '../../interfaces'

chai.use(chaiHttp)

const { expect } = chai

describe('Tests GET /api/events route', () => {
  it('Return status 200 with an array containing all 4 events', async () => chai
    .request(app)
    .get('/api/events')
    .then((res) => {
      expect(res.status).to.be.equal(200)
      expect(res.body).to.be.an('array')
<<<<<<< HEAD
      expect(res.body.length).to.be.lessThanOrEqual(4)
=======
      expect(res.body.length).to.be.equal(4)
>>>>>>> 291ef94dda729d1eae3dc92818d5ff4ce60c8b1b
      res.body.forEach((fight: IEvent) => {
        expect(fight).to.have.property('_id')
        expect(fight).to.have.property('title')
        expect(fight).to.have.property('url')
        expect(fight).to.have.property('date')
        expect(fight).to.have.property('time')
        expect(fight).to.have.property('fightNight')
      })
    }))
})