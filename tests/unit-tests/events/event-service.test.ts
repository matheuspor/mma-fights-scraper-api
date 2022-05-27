import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import { IEvent } from '../../../interfaces';
import { getAll } from '../../../services/event-service';

describe('Tests Event Service', () => {
  const eventMock: IEvent = {
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
    it('Test getAll returns an array of events', async () => {
      const findStub = Sinon.stub(mongoose.Model, 'find').returns({ sort: Sinon.stub().returns([eventMock]) } as any);

      const model = await getAll();

      Sinon.assert.calledWith(findStub, {}, { __v: 0 });
      expect(model).to.be.an('array');
      expect(model).to.be.deep.equal([eventMock]);
    });
  });
});
