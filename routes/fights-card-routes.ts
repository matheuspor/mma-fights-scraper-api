import { Router } from 'express';
import { getAll } from '../controllers/fights-card-controller';

const fightsCardRoutes = Router();

fightsCardRoutes.get('/fights-card', getAll);

export default fightsCardRoutes;
