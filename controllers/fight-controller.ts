import { Request, Response } from 'express';
import * as fightService from '../services/fight-service';

// eslint-disable-next-line import/prefer-default-export
export const getAll = async (req: Request, res: Response) => {
  const fights = await fightService.getAll();
  return res.status(200).json(fights);    
};