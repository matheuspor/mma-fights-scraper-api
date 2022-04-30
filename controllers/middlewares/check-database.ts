import { NextFunction, Request, Response } from 'express';
import connectToDatabase from '../../models/connection';
import * as FightService from '../../services/fight-service';
import { populateDatabase } from './populate-database';

// eslint-disable-next-line import/prefer-default-export
export const checkDatabase = (async (_req: Request, _res: Response, next: NextFunction) => {
  connectToDatabase();
  const databaseFights = await FightService.getAll();

  if (!databaseFights.length) {
    await populateDatabase();
  }
  next();
});