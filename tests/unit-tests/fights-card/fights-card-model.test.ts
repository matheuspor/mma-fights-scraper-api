import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import { FightCard } from '../../../interfaces';
import FightsCard from '../../../models/fights-card';

describe('Tests FightsCard Model', () => {
  const fightsCardMock: FightCard = {
    fight: 1,
    card: [{
      redCornerName: 'redCornerName',
      redCornerPhoto: 'redCornerUrl',
      blueCornerName: 'blueCornerName',
      blueCornerPhoto: 'blueCornerUrl',
    }],
  };
  beforeEach(() => {
    Sinon.restore();
  });

  describe('Testing delete many method', () => {
    it('Test method is called inside model', async () => {
      const deleteManyStub = Sinon.stub(mongoose.Model, 'deleteMany').resolves();
      const model = await FightsCard.deleteMany();
      expect(model).to.be.equal(undefined);
      Sinon.assert.called(deleteManyStub);
    });
  });

  describe('Testing create method', () => {
    it('Test method is called inside model', async () => {
      const createStub = Sinon.stub(mongoose.Model, 'insertMany').resolves([fightsCardMock]);
      const model = await FightsCard.insertMany([fightsCardMock]);
      expect(model).to.be.deep.equal([fightsCardMock]);
      Sinon.assert.calledWithExactly(createStub, [fightsCardMock]);
    });
  });

  describe('Testing find method', () => {
    it('Test method is called inside model', async () => {
      const findStub = Sinon.stub(mongoose.Model, 'find').resolves([fightsCardMock]);
      const model = await FightsCard.find({}, { _id: 0, __v: 0 });
      expect(model).to.be.deep.equal([fightsCardMock]);
      Sinon.assert.called(findStub);
    });
  });
});
