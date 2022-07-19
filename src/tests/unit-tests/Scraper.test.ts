import { expect } from 'chai'
import Sinon from 'sinon'
import Scraper from '../../scraper/Scraper'
import * as helperFunctions from '../../scraper/helper'

describe('Tests Scraper class', () => {
  it('Tests Scraper constructor', () => {
    const scraper = new Scraper()
    expect(scraper).to.be.instanceOf(Scraper)
    expect(scraper.events).to.be.deep.equal([])
    expect(scraper.eventCard).to.be.deep.equal([])
  })
  describe('Tests setup method', () => {
    beforeEach(() => {
      Sinon.restore()
    })

    it('Tests setup method when currentDate is greater than deployedDate', async () => {
      const scrapeEventsStub = Sinon.stub(helperFunctions, 'scrapeEvents').resolves('scrapedEvents' as any)
      const scrapeEventsFightsStub = Sinon.stub(helperFunctions, 'scrapeEventsFights').resolves('scrapedEventsFights' as any)
      const scraper = new Scraper()
      const deployedDate = '01/01/2019'
      await scraper.setup(deployedDate)
      Sinon.assert.calledOnce(scrapeEventsStub)
      Sinon.assert.calledOnceWithExactly(scrapeEventsFightsStub, 'scrapedEvents' as any)
      expect(scraper.events).to.be.equal('scrapedEvents')
      expect(scraper.eventCard).to.be.equal('scrapedEventsFights')
    })
    it('Tests setup method when currentDate is not greater than deployedDate', async () => {
      const scrapeEventsStub = Sinon.stub(helperFunctions, 'scrapeEvents')
      const scrapeEventsFightsStub = Sinon.stub(helperFunctions, 'scrapeEventsFights')
      const scraper = new Scraper()
      const deployedDate = new Date().toLocaleDateString()
      await scraper.setup(deployedDate)
      Sinon.assert.notCalled(scrapeEventsStub)
      Sinon.assert.notCalled(scrapeEventsFightsStub)
      expect(scraper.events).to.be.deep.equal([])
      expect(scraper.eventCard).to.be.deep.equal([])
    })
  })
})