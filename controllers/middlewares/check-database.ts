import { NextFunction, Request, Response } from 'express';
import { fetchFights } from '../../utils/helper-functions';
import * as FightService from '../../services/fight-service';
import { populateDatabase } from './populate-database';

// eslint-disable-next-line import/prefer-default-export
export const checkDatabase = (async (_req: Request, _res: Response, next: NextFunction) => {
  const fights = await fetchFights();
  const databaseFights = await FightService.getAll();

  if (JSON.stringify(fights) === JSON.stringify(databaseFights)) return next();  

  await populateDatabase();
  next();
});