import chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../../app';
import { IFight } from '../../interfaces';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests GET /api/fights route', () => {
  it('Return status 200 with an array containing all 4 fights', async () => chai
    .request(app)
    .get('/api/fights')
    .then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(4);
      res.body.forEach((fight: IFight) => {
        expect(fight).to.have.property('title');
        expect(fight).to.have.property('url');
        expect(fight).to.have.property('date');
        expect(fight).to.have.property('time');
        expect(fight).to.have.property('fightNight');
      });
    }));
});