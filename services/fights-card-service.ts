import { FightCard, IFight } from '../interfaces';
import FightsCard from '../models/fights-card';

export const deleteMany = async () => FightsCard.deleteMany();

export const create = (fights: FightCard[]): Promise<FightCard[]> => (
  FightsCard.create(fights)
);

export const getAll = async (): Promise<FightCard[]> => {
  const card = await FightsCard.find({}, { _id: 0, __v: 0 }).populate('fight', { _id: 0, __v: 0 });
  card.sort((a: FightCard, b: FightCard) => (
    (a.fight as IFight).date.getTime() - (b.fight as IFight).date.getTime()));

  return card;
}; 
