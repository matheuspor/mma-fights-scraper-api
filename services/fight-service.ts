import Fight from '../models/fight-model';
import { IFight } from '../interfaces';

export const deleteMany = async () => Fight.deleteMany();

export const create = (fights: IFight[]): Promise<IFight[]> => (
  Fight.create(fights)
);

export const getAll = async (): Promise<IFight[]> => Fight.find({}, { _id: 0, __v: 0 });
