import { Request, Response } from 'express';
import * as fightsCardService from '../services/fights-card-service';

// eslint-disable-next-line import/prefer-default-export
export const getAll = async (_req: Request, res: Response) => {
  const fightsCard = await fightsCardService.getAll();
    
  return res.status(200).json(fightsCard);    
};