import axios from 'axios'
import { expect } from 'chai'
import { readFileSync } from 'fs'
import Sinon = require('sinon');
import { IFight, IFightCard, IEvent } from '../../interfaces'
import * as helperFunction from '../../helper-function/scraper'
import * as eventService from '../../services/event-service'
import * as fightsCardService from '../../services/fights-card-service'
import populateDatabase from '../../helper-function/populate-database'

const htmlPageMock = JSON.parse(readFileSync('./tests/html-page-mock.json', 'utf8'))
const htmlCardsPageMock = JSON.parse(readFileSync('./tests/html-fightCard-mock.json', 'utf8'))

describe('Tests helper functions', () => {
  const eventMock: IEvent = {
    _id: 1,
    title: 'fight title',
    url: 'fightUrl',
    date: new Date(),
    time: 'fightTime',
    fightNight: true,
  }

  const fightsCardMock: IFightCard = {
    event: 1,
    fights: [
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
      },
    ],
  }

  afterEach(() => {
    Sinon.restore()
  })

  describe('Tests populateDatabase function', () => {
    it('Tests if function calls methods accordingly', async () => {
      const deleteEventsStub = Sinon.stub(eventService, 'deleteMany')
      const deleteFightsCardStub = Sinon.stub(fightsCardService, 'deleteMany')

      const scrapeFightsStub = Sinon.stub(helperFunction, 'scrapeEvents').resolves([eventMock])
      const scrapeFightsCardStub = Sinon.stub(helperFunction, 'scrapeEventsFights').resolves([fightsCardMock])

      const createEventsStub = Sinon.stub(eventService, 'create').resolves()
      const createFightsCardStub = Sinon.stub(fightsCardService, 'create').resolves()

      await populateDatabase()
      Sinon.assert.calledOnce(deleteEventsStub)
      Sinon.assert.calledOnce(deleteFightsCardStub)
      Sinon.assert.calledOnce(scrapeFightsStub)
      Sinon.assert.calledWith(createEventsStub, [eventMock])
      Sinon.assert.calledWith(scrapeFightsCardStub)
      Sinon.assert.calledWith(createFightsCardStub, [fightsCardMock])
    })
  })

  describe('Tests scrapeEvents function', () => {
    it('Returns array with 4 events', async () => {
      const axiosStub = Sinon.stub(axios, 'get').resolves({ data: htmlPageMock })
      const fights = await helperFunction.scrapeEvents()
      Sinon.assert.calledOnceWithExactly(axiosStub, 'https://www.ufc.com.br/events')
      expect(fights.length).to.be.equal(4)
      fights.forEach((fight: IEvent) => {
        expect(fight).to.have.property('_id')
        expect(fight).to.have.property('title')
        expect(fight).to.have.property('url')
        expect(fight).to.have.property('date')
        expect(fight).to.have.property('time')
        expect(fight).to.have.property('fightNight')
      })
    })
  })

  describe('Tests scrapeEventsFights function', () => {
    it('Returns array of fightsCard', async () => {
      const axiosStub = Sinon.stub(axios, 'get').resolves({ data: htmlCardsPageMock })
      const fightsCard = await helperFunction.scrapeEventsFights([eventMock])

      fightsCard.forEach((fight: IFightCard) => {
        const { url } = eventMock
        Sinon.assert.calledOnceWithExactly(axiosStub, url)
        expect(fight).to.have.property('event')
        expect(fight.event).to.equal(eventMock._id)
        expect(fight).to.have.property('fights')
        expect(fight.fights).to.be.an('array')
        fight.fights.forEach((card: IFight, index) => {
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