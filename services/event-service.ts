import Event from '../models/events'
import { IEvent } from '../interfaces'

export const deleteMany = async () => Event.deleteMany()

export const create = (fights: IEvent[]): Promise<IEvent[]> => (
  Event.create(fights)
)

export const getAll = async (): Promise<IEvent[]> => Event.find({}, { __v: 0 })
  .sort({ date: 1 })
