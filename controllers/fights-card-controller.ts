import { Request, Response } from 'express';
import * as fightsCardService from '../services/fights-card-service';

// eslint-disable-next-line import/prefer-default-export
export const getAll = async (req: Request, res: Response) => {
  const fightsCard = await fightsCardService.getAll();
  const sortedByDate = fightsCard.sort((a, b) => (
    a.fight.date - b.fight.date));
  
  return res.status(200).json(sortedByDate);    
};