import express from 'express';
import 'dotenv/config';
import fightsRoutes from './routes/fights-routes';
import fightsCardRoutes from './routes/fights-card-routes';

const app = express();
app.disable('x-powered-by');

app.listen(3000, async () => {
  console.log('Server is running on port 3000');
});

app.use('/api', fightsRoutes);
app.use('/api', fightsCardRoutes);

export default app;
