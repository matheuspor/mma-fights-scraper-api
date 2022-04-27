import axios from 'axios';
import { expect } from 'chai';
import { readFileSync } from 'fs';
import Sinon = require('sinon');
import mongoose from 'mongoose';
import { FightCard, IFight } from '../../interfaces';
import * as helperFunction from '../../utils/helper-functions';
import { populateDatabase } from '../../controllers/middlewares/populate-database';
import * as FightService from '../../services/fight-service';
import * as FightsCardService from '../../services/fights-card-service';

const htmlPageMock = JSON.parse(readFileSync('./tests/html-page-mock.json', 'utf8'));

describe('Tests helper functions', () => {
  const fightMock: IFight = {
    title: 'fight title',
    url: 'fightUrl',
    date: new Date(),
    time: 'fightTime',
    fightNight: true,
  };

  const fightsCardMock: FightCard = {
    fight: fightMock,
    card: [{
      redCornerName: 'card title',
      redCornerPhoto: 'cardUrl',
      blueCornerName: 'card title',
      blueCornerPhoto: 'cardUrl',
    }],
  };

  afterEach(() => {
    Sinon.restore();
  });

  describe('Tests populateDatabase function', () => {
    beforeEach(() => {
      Sinon.stub(helperFunction, 'fetchFights').resolves([fightMock]);
      Sinon.stub(helperFunction, 'fetchFightsCard').resolves([fightsCardMock]);
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('Tests FightsCardService.deleteMany() and FightService.deleteMany() are called', async () => {
      Sinon.stub(mongoose.Model, 'create').resolves();

      const fightsCardDeleteMany = Sinon.stub(FightsCardService, 'deleteMany').resolves();
      const fightsDeleteMany = Sinon.stub(FightService, 'deleteMany').resolves();

      await populateDatabase();
      Sinon.assert.calledOnce(fightsCardDeleteMany);
      Sinon.assert.calledOnce(fightsDeleteMany);
    });

    it('Tests FightsCardService.create() and FightService.create() are called with expected values', async () => {
      Sinon.stub(mongoose.Model, 'deleteMany').resolves();

      const fightsCardCreate = Sinon.stub(FightsCardService, 'create').resolves();
      const fightsCreate = Sinon.stub(FightService, 'create').resolves();

      await populateDatabase();
      Sinon.assert.calledOnceWithExactly(fightsCardCreate, [fightsCardMock]);
      Sinon.assert.calledOnceWithExactly(fightsCreate, [fightMock]);
    });
  });

  describe('Tests fetchFights function', () => {
    it('Returns array of fights', async () => {
      const axiosStub = Sinon.stub(axios, 'get').resolves({ data: htmlPageMock });
      const fights = await helperFunction.fetchFights();
      Sinon.assert.calledOnceWithExactly(axiosStub, 'https://www.ufc.com.br/events');
      expect(fights.length).to.be.equal(4);
      fights.forEach((fight: IFight) => {
        expect(fight).to.have.property('title');
        expect(fight).to.have.property('url');
        expect(fight).to.have.property('date');
        expect(fight).to.have.property('time');
        expect(fight).to.have.property('fightNight');
      });
    });
  });

  describe('Tests fetchPageHtml function', () => {
    it('Calls axios with correct url', async () => {
      const axiosStub = Sinon.stub(axios, 'get').resolves({ data: 'sampleTest' });

      await helperFunction.fetchPageHtml('testUrl');
      Sinon.assert.calledOnceWithExactly(axiosStub, 'testUrl');
    });
  });
});