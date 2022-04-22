import { Request, Response } from 'express';
import { getFights } from '../services/fight-service';

const getAll = async (req: Request, res: Response) => {
  const fights = await getFights();
  return res.status(200).send(fights);    
};

export default getAll;