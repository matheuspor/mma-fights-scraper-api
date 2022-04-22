import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import { IFight } from '../interfaces';
import Fight from '../models/fight';

describe('Tests Fight Model', () => {
  const fightMock: IFight = {
    title: 'fight title',
    url: 'fightUrl',
    date: new Date(),
    time: 'fightTime',
    fightNight: true,
  };

  describe('Testing delete many method', () => {
    before(() => {
      Sinon.stub(mongoose.Model, 'deleteMany').resolves();
    });

    after(() => {
      Sinon.restore();
    });

    it('Test method is called inside model', async () => {
      const model = await Fight.deleteMany();
      expect(model).to.be.equal(undefined);
    });
  });

  describe('Testing insert many method', () => {
    before(() => {
      Sinon.stub(mongoose.Model, 'insertMany').resolves([fightMock]);
    });

    after(() => {
      Sinon.restore();
    });

    it('Test method is called inside model', async () => {
      const model = await Fight.insertMany([fightMock]);
      expect(model).to.be.deep.equal([fightMock]);
    });
  });
});
