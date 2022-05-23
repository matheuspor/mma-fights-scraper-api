import { Request, Response } from 'express';
import * as fightsCardService from '../services/fights-card-service';

export const getAll = async (_req: Request, res: Response) => {
  const fightsCard = await fightsCardService.getAll();
    
  return res.status(200).json(fightsCard);    
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fightCard = await fightsCardService.getById(id);
    
  return res.status(200).json(fightCard);    
};