import chai from 'chai'
import chaiHttp = require('chai-http');
import app from '../../app'
import { IFight, IFightCard } from '../../interfaces'

chai.use(chaiHttp)

const { expect } = chai

const isSorted = (arr: IFightCard[]) => arr
  .every((key: IFightCard, index) => (index === 0 ? true
    : (key.event) > (arr[index - 1].event)))

describe('Tests /api/fights-card routes', () => {
  describe('Tests GET /api/fights-card route', () => {
    it('Returns an array containing max 4 fightsCard', async () => chai
      .request(app)
      .get('/api/fights-card')
      .then((res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.be.lessThanOrEqual(4)
        res.body.forEach((fightCard: IFightCard) => {
          expect(fightCard).to.have.property('event')
          expect(fightCard).to.have.property('fights')
          fightCard.fights.forEach((card: IFight) => {
            expect(card).to.have.property('redCornerFighter')
            expect(card).to.have.property('blueCornerFighter')
          })
        })
      }))

    it('Return array sorted ascended by _id', async () => chai
      .request(app)
      .get('/api/fights-card')
      .then((res) => {
        expect(isSorted(res.body)).to.be.equal(true)
      }))
  })
  describe('Tests GET /api/fights-card/:id route', () => {
    it('Returns a fightCard with the given id', async () => chai
      .request(app)
      .get('/api/fights-card/1')
      .then((res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('event')
        expect(res.body.event).to.equal(1)
        expect(res.body).to.have.property('fights')
        res.body.fights.forEach((card: IFight) => {
          expect(card).to.have.property('redCornerFighter')
          expect(card).to.have.property('blueCornerFighter')
        })
      }))

    it('Returns empty object if _id does not exist', async () => chai
      .request(app)
      .get('/api/fights-card/5')
      .then((res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.be.deep.equal({})
      }))
  })
})
