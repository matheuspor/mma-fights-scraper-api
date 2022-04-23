import { fetchFights } from '../utils/helper-functions';
import Fight from '../models/fight-model';
import { IFight } from '../interfaces';

export const populateDatabase = async () => {
  const fights = await fetchFights();    
  await Fight.deleteMany();
  await Fight.insertMany(fights);
};
  
export const getAll = async (): Promise<IFight[]> => Fight.find({}, { _id: 0, __v: 0 });
