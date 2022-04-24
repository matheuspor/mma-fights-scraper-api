import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import { IFight } from '../../interfaces';
import { getAll, populateDatabase } from '../../services/fight-service';
import * as helperFunctions from '../../utils/helper-functions';

describe('Tests Fight Service', () => {
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

  describe('Tests populateDatabase function', () => {
    beforeEach(() => {
      Sinon.stub(helperFunctions, 'fetchFights').resolves([fightMock]);
    });

    it('Tests model.deleteMany() is called', async () => {    
      Sinon.stub(mongoose.Model, 'insertMany').resolves([fightMock]);
      const deleteStub = Sinon.stub(mongoose.Model, 'deleteMany').resolves();
      await populateDatabase();
      Sinon.assert.calledOnce(deleteStub);
    });

    it('Tests model.insertMany is called', async () => {    
      Sinon.stub(mongoose.Model, 'deleteMany').resolves();
      const insertStub = Sinon.stub(mongoose.Model, 'insertMany').resolves([fightMock]);        
      await populateDatabase();
      Sinon.assert.calledOnceWithMatch(insertStub, [fightMock]);
    });
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
