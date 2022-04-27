import { FightCard } from '../interfaces';
import FightsCard from '../models/fights-card-model';

export const deleteMany = async () => FightsCard.deleteMany();

export const create = (fights: FightCard[]): Promise<FightCard[]> => (
  FightsCard.create(fights)
);

export const getAll = async (): Promise<FightCard[]> => FightsCard.find({}, { _id: 0, __v: 0 }).populate('fight', { _id: 0, __v: 0 });
