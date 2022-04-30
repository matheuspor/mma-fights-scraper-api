import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon = require('sinon');
import { FightCard } from '../../../interfaces';
import * as fightsCardService from '../../../services/fights-card-service';
import * as fightsCardController from '../../../controllers/fights-card-controller';

describe('Tests Fight Controller', () => {
  const fightsCardMock: FightCard = {
    fight: 'sampleId',
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
  
  afterEach(() => {
    Sinon.restore();
  });

  describe('Tests getAll fightsCard', () => {
    const req = {} as Request;
    const res = {} as Response;

    it('Return status 200 with an array of fightsCard', async () => {
      Sinon.stub(fightsCardService, 'getAll').resolves([fightsCardMock]);
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns(null);

      await fightsCardController.getAll(req, res);
      expect((res.status as any).calledWith(200)).to.equal(true);
      expect((res.json as any).calledWith([fightsCardMock])).to.equal(true);
    });
  });
});