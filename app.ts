import express from 'express';
import dotenv from 'dotenv';
import fightsRoutes from './routes/fights-routes';
import fightsCardRoutes from './routes/fights-card-routes';
import connectToDatabase from './models/connectToDatabase';

dotenv.config();

const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  connectToDatabase();
  console.log('Server is running on port 3000');
});

app.use((_req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/api', fightsRoutes);
app.use('/api', fightsCardRoutes);

export default app;
