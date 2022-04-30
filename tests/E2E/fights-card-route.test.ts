import chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../../app';
import { Card, FightCard } from '../../interfaces';

chai.use(chaiHttp);

const { expect } = chai;

const isSorted = (arr: FightCard[]) => arr
  .every((key: FightCard, index) => (index === 0 ? true
    : key.fight.date > arr[index - 1].fight.date));

describe('Tests GET /api/fights-card route', () => {
  it('Return status 200 with an array containing all 4 fightsCard', async () => chai
    .request(app)
    .get('/api/fights-card')
    .then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(4);
      res.body.forEach((fightCard: FightCard) => {
        expect(fightCard).to.have.property('fight');
        expect(fightCard).to.have.property('card');
        fightCard.card.forEach((card: Card) => {
          expect(card).to.have.property('redCornerName');
          expect(card).to.have.property('blueCornerName');
          expect(card).to.have.property('redCornerPhoto');
          expect(card).to.have.property('blueCornerPhoto');
        });
      });
    }));

  it('Return array sorted ascended by date', async () => chai
    .request(app)
    .get('/api/fights-card')
    .then((res) => {
      expect(isSorted(res.body)).to.be.equal(true);
    }));
});