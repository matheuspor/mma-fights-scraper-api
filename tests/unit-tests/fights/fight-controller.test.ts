import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon = require('sinon');
import { IFight } from '../../../interfaces';
import * as fightService from '../../../services/fight-service';
import * as fightController from '../../../controllers/fight-controller';

describe('Tests Fight Controller', () => {
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

  describe('Tests getAll fights', () => {
    const req = {} as Request;
    const res = {} as Response;

    it('Return status 201 with an array of fights', async () => {
      Sinon.stub(fightService, 'getAll').resolves([fightMock]);
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns(null);
      
      await fightController.getAll(req, res);
      expect((res.status as any).calledWith(200)).to.equal(true);
      expect((res.json as any).calledWith([fightMock])).to.equal(true);
    });
  });
});