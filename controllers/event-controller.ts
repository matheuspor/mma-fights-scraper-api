import { Request, Response } from 'express';
import * as eventService from '../services/event-service';

// eslint-disable-next-line import/prefer-default-export
export const getAll = async (_req: Request, res: Response) => {
  const events = await eventService.getAll();
  return res.status(200).json(events);    
};