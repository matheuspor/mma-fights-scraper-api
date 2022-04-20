import express, { Request, Response } from 'express';
import { fetchFights } from './helper-functions';

const app = express();

app.listen(3000, async () => {
  console.log('Server is running on port 3000');
});

app.get('/fights', async (req: Request, res: Response) => {
  const fights = await fetchFights()
  return res.status(200).send(fights)
})
