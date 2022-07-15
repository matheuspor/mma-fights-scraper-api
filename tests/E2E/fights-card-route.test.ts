import chai from 'chai'
import chaiHttp = require('chai-http');
import app from '../../app'
import { IFight, IFightCard, IEvent } from '../../interfaces'

chai.use(chaiHttp)

const { expect } = chai

const isSorted = (arr: IFightCard[]) => arr
  .every((key: IFightCard, index) => (index === 0 ? true
    : (key.event as IEvent).date > (arr[index - 1].event as IEvent).date))

describe('Tests GET /api/fights-card route', () => {
  it('Returns an array containing all 4 fightsCard', async () => chai
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

  it('Return array sorted ascended by date', async () => chai
    .request(app)
    .get('/api/fights-card')
    .then((res) => {
      expect(isSorted(res.body)).to.be.equal(true)
    }))
})