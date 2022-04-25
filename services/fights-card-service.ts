import { FightCard } from '../interfaces';
import FightsCard from '../models/fights-card';

export const deleteMany = async () => FightsCard.deleteMany();

export const insertMany = (fights: FightCard[]): Promise<FightCard[]> => (
  FightsCard.insertMany(fights)
);

export const getAll = async (): Promise<FightCard[]> => FightsCard.find({}, { _id: 0, __v: 0 });
