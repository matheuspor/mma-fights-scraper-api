import express from 'express';
import 'dotenv/config';
import connectToDatabase from './models/connection';
import fightsRoutes from './routes/fights-routes';
import fightsCardRoutes from './routes/fights-card-routes';
import { populateDatabase } from './controllers/middlewares/populate-database';
import { checkDatabase } from './controllers/middlewares/check-database';

const app = express();

app.listen(3000, async () => {
  connectToDatabase();
  await populateDatabase();
  console.log('Server is running on port 3000');
});

app.use(checkDatabase);

app.use('/api', fightsRoutes);
app.use('/api', fightsCardRoutes);

export default app;
