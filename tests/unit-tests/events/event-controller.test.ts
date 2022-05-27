import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon = require('sinon');
import { IEvent } from '../../../interfaces';
import * as eventService from '../../../services/event-service';
import * as eventController from '../../../controllers/event-controller';

describe('Tests Event Controller', () => {
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

  describe('Tests getAll fights', () => {
    const req = {} as Request;
    const res = {} as Response;

    it('Return status 200 with an array of events', async () => {
      Sinon.stub(eventService, 'getAll').resolves([eventMock]);
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns(null);
      
      await eventController.getAll(req, res);
      expect((res.status as any).calledWith(200)).to.equal(true);
      expect((res.json as any).calledWith([eventMock])).to.equal(true);
    });
  });
});