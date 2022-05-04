import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import { IFight } from '../../../interfaces';
import { getAll } from '../../../services/fight-service';

describe('Tests Fight Service', () => {
  const fightMock: IFight = {
    _id: 1,
    title: 'fight title',
    url: 'fightUrl',
    date: new Date(),
    time: 'fightTime',
    fightNight: true,
  };
  beforeEach(() => {
    Sinon.restore();
  });

  describe('Tests getAll function', () => {
    it('Test getAll returns an array of fights', async () => {
      Sinon.stub(mongoose.Model, 'find').resolves([fightMock]);
      const model = await getAll();
      expect(model).to.be.an('array');
      expect(model).to.be.deep.equal([fightMock]);
    });
  });
});
