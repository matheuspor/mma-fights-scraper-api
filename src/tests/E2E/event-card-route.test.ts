import chai from 'chai'
import chaiHttp = require('chai-http');
import app from '../../app'
import { IFight, IEventCard } from '../../interfaces'

chai.use(chaiHttp)

const { expect } = chai

const isSorted = (arr: IEventCard[]) => arr
  .every((key: IEventCard, index) => (index === 0 ? true
    : (key._id) > (arr[index - 1]._id)))

describe('Tests /api/event-card routes', () => {
  describe('Tests GET /api/event-card route', () => {
    it('Returns an array containing max 4 fightsCard', async () => chai
      .request(app)
      .get('/api/event-card')
      .then((res) => {
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.be.lessThanOrEqual(4)
        res.body.forEach((fightCard: IEventCard) => {
          expect(fightCard).to.have.property('_id')
          expect(fightCard).to.have.property('fights')
          fightCard.fights.forEach((card: IFight) => {
            expect(card).to.have.property('redCornerFighter')
            expect(card).to.have.property('blueCornerFighter')
          })
        })
      }))
    it('Test if array is sorted by _id', async () => chai
      .request(app)
      .get('/api/event-card')
      .then((res) => {
        expect(isSorted(res.body)).to.be.equal(true)
      }))
  })

  describe('Tests GET /api/event-card/:id route', () => {
    describe('If id is valid', () => {
      it('Returns event card with the given id', async () => chai
        .request(app)
        .get('/api/event-card/1')
        .then((res) => {
          expect(res.status).to.be.equal(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('_id')
          expect(res.body._id).to.equal(1)
          res.body.fights.forEach((card: IFight) => {
            expect(card).to.have.property('redCornerFighter')
            expect(card).to.have.property('blueCornerFighter')
          })
        }))
    })
    describe('If id is invalid', () => {
      it('Returns empty object if _id does not exist', async () => chai
        .request(app)
        .get('/api/event-card/5')
        .then((res) => {
          expect(res.status).to.be.equal(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.be.deep.equal({})
        }))
    })
  })
})
