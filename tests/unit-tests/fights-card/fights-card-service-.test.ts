import { expect } from 'chai'
import mongoose from 'mongoose'
import sinon from 'sinon'
import { IFightCard } from '../../../interfaces'
import { getAll, create, deleteMany } from '../../../services/fights-card-service'

const fightsCardMock: IFightCard = {
  event: 1,
  fights: [{
    redCornerFighter: 'redCornerName',
    blueCornerFighter: 'blueCornerName',
  }],
}

const mockGetAll = {
  populate: sinon.stub().resolves([fightsCardMock]),
}

describe('Tests FightsCard Service', () => {
  beforeEach(() => {
    sinon.restore()
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('Tests getAll function', () => {
    it('Test getAll calls expected methods', async () => {
      const findStub = sinon.stub(mongoose.Model, 'find').returns(mockGetAll as any)
      const result = await getAll()

      sinon.assert.called(findStub)
      expect(result).to.be.an('array')
      expect(result).to.be.deep.equal([fightsCardMock])
    })
  })

  describe('Tests create function', () => {
    it('Test create returns created item', async () => {
      const createStub = sinon.stub(mongoose.Model, 'create').resolves([fightsCardMock])
      const result = await create([fightsCardMock])
      expect(result).to.be.an('array')
      expect(result).to.be.deep.equal([fightsCardMock])
      sinon.assert.calledWith(createStub, [fightsCardMock])
    })
  })

  describe('Tests deleteMany function', () => {
    it('Test deleteMany model is called', async () => {
      const deleteStub = sinon.stub(mongoose.Model, 'deleteMany').resolves()
      await deleteMany()
      sinon.assert.called(deleteStub)
    })
  })
})
