import express from 'express';
import connectToDatabase from './models/connection';
import fightsRoutes from './routes/fights-routes';
import { populateDatabase } from './services/fight-service';

const app = express();

app.listen(3000, async () => {
  connectToDatabase()
  await populateDatabase()
  console.log('Server is running on port 3000')
});

app.use('/api', fightsRoutes)
