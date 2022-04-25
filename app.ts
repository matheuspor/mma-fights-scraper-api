import express from 'express';
import 'dotenv/config';
import connectToDatabase from './models/connection';
import fightsRoutes from './routes/fights-routes';
import { populateDatabase } from './services/fight-service';
import fightsCardRoutes from './routes/fights-card-routes';

const app = express();

app.listen(3000, async () => {
  console.log('Server is running on port 3000');
});

app.use(async (_req, _res, next) => {
  connectToDatabase();
  await populateDatabase();
  next();
});

app.use('/api', fightsRoutes);
app.use('/api', fightsCardRoutes);

export default app;
