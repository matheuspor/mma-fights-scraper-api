import express from 'express';
import dotenv from 'dotenv';
import fightsRoutes from './routes/fights-routes';
import fightsCardRoutes from './routes/fights-card-routes';
import connectToDatabase from './models/connectToDatabase';
import populateDatabase from './helper-function/populate-database';

dotenv.config();

const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT || 3000;
let deployedDate = new Date('2022-01-01').toLocaleDateString();

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((_req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', '*');
  next();
});

app.use(async (_req, _res, next) => {
  connectToDatabase();
  await populateDatabase(deployedDate);
  deployedDate = new Date().toLocaleDateString();
  next();
});

app.use('/api', fightsRoutes);
app.use('/api', fightsCardRoutes);

export default app;
