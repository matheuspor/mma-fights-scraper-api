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
    mainCard: [
      {
        redCornerFighter: 'Rob Font',
        blueCornerFighter: 'Marlon Vera',
      },
      {
        redCornerFighter: 'Andrei Arlovski',
        blueCornerFighter: 'Jake Collier',
      },
      {
        redCornerFighter: 'Andre Fili',
        blueCornerFighter: 'Joanderson Brito',
      },
      {
        redCornerFighter: 'Jared Gordon',
        blueCornerFighter: 'Grant Dawson',
      },
      {
        redCornerFighter: 'Darren Elkins',
        blueCornerFighter: 'Tristan Connelly',
      },
      {
        redCornerFighter: 'Krzysztof Jotko',
        blueCornerFighter: 'Gerald Meerschaert',
      },
    ],
    prelimsCard: [
      {
        redCornerFighter: 'Alexandr Romanov',
        blueCornerFighter: 'Chase Sherman',
      },
      {
        redCornerFighter: 'Daniel Lacerda',
        blueCornerFighter: 'Francisco Figueiredo',
      },
      {
        redCornerFighter: 'Gabriel Green',
        blueCornerFighter: 'Yohan Lainesse Lainesse',
      },
      {
        redCornerFighter: 'Natan Levy',
        blueCornerFighter: 'Mike Breeden',
      },
      {
        redCornerFighter: 'Gina Mazany',
        blueCornerFighter: 'Shanna Young',
      },
      {
        redCornerFighter: 'Tatsuro Taira',
        blueCornerFighter: 'Carlos Candelario',
      }],
  }

  afterEach(() => {
    Sinon.restore()
  })

  describe('Tests scrapeEvents function', () => {
    it('Returns array with max 4 events', async () => {
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
    it('Returns array of fightsCard', async () => {
      const axiosStub = Sinon.stub(axios, 'get').resolves({ data: htmlCardsPageMock })
      const fightsCard = await helperFunction.scrapeEventsFights([eventMock])

      fightsCard.forEach((fight: IEventCard) => {
        const { url } = eventMock
        Sinon.assert.calledOnceWithExactly(axiosStub, url)
        expect(fight).to.have.property('_id')
        expect(fight._id).to.equal(eventMock._id)
        expect(fight).to.have.property('mainCard')
        expect(fight).to.have.property('prelimsCard')
        expect(fight.mainCard).to.be.an('array')
        expect(fight.prelimsCard).to.be.an('array')
        fight.mainCard.forEach((card: IFight, index) => {
          expect(card).to.have.property('redCornerFighter')
          expect(card).to.have.property('blueCornerFighter')
          expect(card).to.deep.equal(fightsCardMock.mainCard[index])
        })
        fight.prelimsCard.forEach((card: IFight, index) => {
          expect(card).to.have.property('redCornerFighter')
          expect(card).to.have.property('blueCornerFighter')
          expect(card).to.deep.equal(fightsCardMock.prelimsCard[index])
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