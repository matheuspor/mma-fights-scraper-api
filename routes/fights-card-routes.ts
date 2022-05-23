import { Router } from 'express';
import { getAll, getById } from '../controllers/fights-card-controller';

const fightsCardRoutes = Router();

fightsCardRoutes.get('/fights-card', getAll);
fightsCardRoutes.get('/fights-card/:id', getById);

export default fightsCardRoutes;