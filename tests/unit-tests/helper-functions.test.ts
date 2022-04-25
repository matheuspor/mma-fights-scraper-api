import axios from 'axios';
import { expect } from 'chai';
import { readFileSync } from 'fs';
import Sinon = require('sinon');
import * as helperFunction from '../../utils/helper-functions';

const htmlPageMock = JSON.parse(readFileSync('./tests/html-page-mock.json', 'utf8'));
const mockFights = [
  {
    title: 'Lemos vs Andrade',
    url: 'https://www.ufc.com/event/ufc-fight-night-april-23-2022',
    date: new Date('2022-04-23T03:00:00.000Z'),
    time: '21:00 EDT',
    fightNight: true,
  },
  {
    title: 'Font vs Vera',
    url: 'https://www.ufc.com/event/ufc-fight-night-april-30-2022',
    date: new Date('2022-04-30T03:00:00.000Z'),
    time: '19:00 EDT',
    fightNight: true,
  },
  {
    title: 'Oliveira vs Gaethje',
    url: 'https://www.ufc.com/event/ufc-274',
    date: new Date('2022-05-07T03:00:00.000Z'),
    time: '22:00 EDT',
    fightNight: false,
  },
  {
    title: 'Blachowicz vs Rakic',
    url: 'https://www.ufc.com/event/ufc-fight-night-may-14-2022',
    date: new Date('2022-05-14T03:00:00.000Z'),
    time: '22:00 EDT',
    fightNight: true,
  },
];

describe('Tests helper functions', () => {
  beforeEach(() => {
    Sinon.restore();
  });
  
  describe('Tests fetchFights function', () => {
    it('Returns array of fights', async () => {
      const fetchPageHtmlStub = Sinon.stub(helperFunction, 'fetchPageHtml').resolves(htmlPageMock);
      const fights = await helperFunction.fetchFights();
      Sinon.assert.calledOnce(fetchPageHtmlStub);
      expect(fights).to.be.deep.equal(mockFights);
    });
  });

  describe('Tests fetchPageHtml function', () => {
    it('Calls axios with correct url', async () => {
      const axiosStub = Sinon.stub(axios, 'get').resolves(Promise.resolve({ data: 'sampleTest' }));

      await helperFunction.fetchPageHtml('testUrl');
      Sinon.assert.calledOnceWithExactly(axiosStub, 'testUrl');
    });
  });
});