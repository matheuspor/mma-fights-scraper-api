import axios from 'axios'
import { expect } from 'chai'
import { readFileSync } from 'fs'
import Sinon = require('sinon');
import { IEvent, IFight, IFightCard } from '../../interfaces'
import * as helperFunction from '../../scraper/helper'

const htmlPageMock = JSON.parse(readFileSync('./tests/unit-tests/mocks/html-page-mock.json', 'utf8'))
const htmlCardsPageMock = JSON.parse(readFileSync('./tests/unit-tests/mocks/html-fightCard-mock.json', 'utf8'))

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
    _id: 1,
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
        expect(fight).to.have.property('_id')
        expect(fight._id).to.equal(eventMock._id)
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