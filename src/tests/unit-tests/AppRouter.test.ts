import { expect } from 'chai'
import Sinon from 'sinon'
import AppRouter from '../../routes/AppRouter'

describe('Tests AppRouter class', () => {
  const scrapedDataMock: any = {
    events: 'scrapedEvents',
    eventCard: 'scrapedCard',
  }
  it('Tests AppRouter constructor', () => {
    const addRouteStub = Sinon.stub(AppRouter.prototype, 'addRoute')
    const appRouter = new AppRouter(scrapedDataMock)
    expect(appRouter).to.be.instanceOf(AppRouter)
    Sinon.assert.calledWithExactly(addRouteStub, scrapedDataMock)
  })
})