import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import { IFight } from '../../../interfaces';
import Fight from '../../../models/fight';

describe('Tests Fight Model', () => {
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

  describe('Testing delete many method', () => {
    it('Test method is called inside model', async () => {
      Sinon.stub(mongoose.Model, 'deleteMany').resolves();
      const model = await Fight.deleteMany();
      expect(model).to.be.equal(undefined);
    });
  });

  describe('Testing insert many method', () => {
    it('Test method is called inside model', async () => {
      Sinon.stub(mongoose.Model, 'insertMany').resolves([fightMock]);
      const model = await Fight.insertMany([fightMock]);
      expect(model).to.be.deep.equal([fightMock]);
    });
  });

  describe('Testing find method', () => {
    it('Test method is called inside model', async () => {
      const findStub = Sinon.stub(mongoose.Model, 'find').resolves([fightMock]);
      const model = await Fight.find({}, { _id: 0, __v: 0 });
      expect(model).to.be.deep.equal([fightMock]);
      Sinon.assert.called(findStub);
    });
  });
});
