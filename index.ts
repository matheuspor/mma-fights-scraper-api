import express, { Request, Response } from 'express';
import { Fight } from './interfaces';
import connectToDatabase from './models/connection';
import fightService from './services/fightService';

const app = express();

app.listen(3000, async () => {
  connectToDatabase()
  await fightService.populateDatabase()
  console.log('Server is running on port 3000')
});

app.get('/fights', async (req: Request, res: Response) => {
  const fights = await fightService.getFights()
  return res.status(200).send(fights)
})
