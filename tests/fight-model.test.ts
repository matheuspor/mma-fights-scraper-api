import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import { IFight } from '../interfaces';
import Fight from '../models/fight-model';

describe('Tests Fight Model', () => {
  const fightMock: IFight = {
    title: 'fight title',
    url: 'fightUrl',
    date: new Date(),
    time: 'fightTime',
    fightNight: true,
  };
  beforeEach(() => {
    Sinon.restore();
  });

  describe('Testing delete many method', () => {
    it('Test method is called inside model', async () => {
      Sinon.stub(mongoose.Model, 'deleteMany').resolves();
      const model = await Fight.deleteMany();
      expect(model).to.be.equal(undefined);
    });
  });

  describe('Testing insert many method', () => {
    it('Test method is called inside model', async () => {
      Sinon.stub(mongoose.Model, 'insertMany').resolves([fightMock])
      const model = await Fight.insertMany([fightMock]);
      expect(model).to.be.deep.equal([fightMock]);
    });
  });
});
