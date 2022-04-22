import { fetchFights } from '../utils/helper-functions';
import Fight from '../models/fight-model';

export const populateDatabase = async () => {
  const fights = await fetchFights();    
  await Fight.deleteMany();
  await Fight.insertMany(fights);
};
  
export const getAll = async () => Fight.find({}, { _id: 0, _v: 0 });
