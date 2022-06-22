import { IFightCard, IEvent } from '../interfaces'
import FightsCard from '../models/fights-card'

export const deleteMany = async () => FightsCard.deleteMany()

export const create = (fights: IFightCard[]): Promise<IFightCard[]> => (
  FightsCard.create(fights)
)

export const getAll = async (): Promise<IFightCard[]> => {
  const card = await FightsCard.find({}, { _id: 0, __v: 0 }).populate('event', { __v: 0 })
  card.sort((a: IFightCard, b: IFightCard) => (
    (a.event as IEvent).date.getTime() - (b.event as IEvent).date.getTime()))

  return card
}

export const getById = async (id: string) => FightsCard.findOne({ event: id }, { _id: 0, __v: 0 }).populate('event', { __v: 0 })