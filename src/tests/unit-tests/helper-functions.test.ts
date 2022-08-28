import axios from 'axios'
import { expect } from 'chai'
import { readFileSync } from 'fs'
import Sinon = require('sinon');
import { IEvent, IFight, IEventCard } from '../../interfaces'
import * as helperFunction from '../../scraper/helper'

const htmlPageMock = JSON.parse(readFileSync('./src/tests/unit-tests/mocks/html-page-mock.json', 'utf8'))
const htmlCardsPageMock = JSON.parse(readFileSync('./src/tests/unit-tests/mocks/html-fightCard-mock.json', 'utf8'))

describe('Tests helper functions', () => {
  const eventMock: IEvent = {
    _id: 1,
    title: 'fight title',
    url: 'fightUrl',
    date: new Date(),
    time: 'fightTime',
    event: 'UFC-FightNight',
  }

  const fightsCardMock: IEventCard = {
    _id: 1,
    fights: [
      {
        redCornerFighter: 'Cory Sandhagen',
        blueCornerFighter: 'Song Yadong',
      },
      {
        redCornerFighter: 'Giga Chikadze',
        blueCornerFighter: 'Sodiq Yusuff',
      },
      {
        redCornerFighter: 'Chidi Njokuani',
        blueCornerFighter: 'Gregory Rodrigues',
      },
      {
        redCornerFighter: 'AndreFili',
        blueCornerFighter: 'Lando Vannata',
      }],
  }

  afterEach(() => {
    Sinon.restore()
  })

  describe('Tests scrapeEvents function', () => {
    it('Return array with max 4 events', async () => {
      const axiosStub = Sinon.stub(axios, 'get').resolves({ data: htmlPageMock })
      const fights = await helperFunction.scrapeEvents()
      Sinon.assert.calledOnceWithExactly(axiosStub, 'https://www.ufc.com.br/events')
      expect(fights.length).to.be.lessThanOrEqual(4)
      fights.forEach((fight: IEvent) => {
        expect(fight).to.have.property('_id')
        expect(fight).to.have.property('title')
        expect(fight).to.have.property('url')
        expect(fight).to.have.property('date')
        expect(fight).to.have.property('time')
        expect(fight).to.have.property('event')
      })
    })
  })

  describe('Tests scrapeEventsFights function', () => {
    it('Return array of fightsCard', async () => {
      const axiosStub = Sinon.stub(axios, 'get').resolves({ data: htmlCardsPageMock })
      const fightsCard = await helperFunction.scrapeEventsFights([eventMock])

      fightsCard.forEach((event: IEventCard) => {
        const { url } = eventMock
        Sinon.assert.calledOnceWithExactly(axiosStub, url)
        expect(event).to.have.property('_id')
        expect(event._id).to.equal(eventMock._id)
        expect(event.fights).to.be.an('array')
        event.fights.forEach((card: IFight, index) => {
          expect(card).to.have.property('redCornerFighter')
          expect(card).to.have.property('blueCornerFighter')
          expect(card).to.deep.equal(fightsCardMock.fights[index])
        })
      })
    })
  })

  describe('Tests fetchPageHtml function', () => {
    it('Calls axios with correct url', async () => {
      const axiosStub = Sinon.stub(axios, 'get').resolves({ data: 'sampleTest' })

      await helperFunction.fetchPageHtml('testUrl')
      Sinon.assert.calledOnceWithExactly(axiosStub, 'testUrl')
    })
  })
})