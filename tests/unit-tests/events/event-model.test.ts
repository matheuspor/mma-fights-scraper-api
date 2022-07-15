import { expect } from 'chai'
import mongoose from 'mongoose'
import Sinon from 'sinon'
import { IEvent } from '../../../interfaces'
import Event from '../../../models/events'

describe('Tests Event Model', () => {
  const eventMock: IEvent = {
    _id: 1,
    title: 'fight title',
    url: 'fightUrl',
    date: new Date(),
    time: 'fightTime',
    fightNight: true,
  }
  beforeEach(() => {
    Sinon.restore()
  })

  describe('Testing delete many method', () => {
    it('Test method is called inside model', async () => {
      Sinon.stub(mongoose.Model, 'deleteMany').resolves()
      const model = await Event.deleteMany()
      expect(model).to.be.equal(undefined)
    })
  })

  describe('Testing insert many method', () => {
    it('Test method is called inside model', async () => {
      Sinon.stub(mongoose.Model, 'insertMany').resolves([eventMock])
      const model = await Event.insertMany([eventMock])
      expect(model).to.be.deep.equal([eventMock])
    })
  })

  describe('Testing find method', () => {
    it('Test method is called inside model', async () => {
      const findStub = Sinon.stub(mongoose.Model, 'find').resolves([eventMock])
      const model = await Event.find({}, { _id: 0, __v: 0 })
      expect(model).to.be.deep.equal([eventMock])
      Sinon.assert.called(findStub)
    })
  })
})
