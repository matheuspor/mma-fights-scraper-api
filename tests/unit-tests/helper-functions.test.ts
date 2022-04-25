import axios from 'axios';
import { expect } from 'chai';
import { readFileSync } from 'fs';
import Sinon = require('sinon');
import { IFight } from '../../interfaces';
import * as helperFunction from '../../utils/helper-functions';

const htmlPageMock = JSON.parse(readFileSync('./tests/html-page-mock.json', 'utf8'));

describe('Tests helper functions', () => {
  beforeEach(() => {
    Sinon.restore();
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