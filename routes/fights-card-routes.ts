import { Router } from 'express';
import { getAll } from '../controllers/fight-controller';

const fightsCardRoutes = Router();

fightsCardRoutes.get('/fights-card', getAll);

export default fightsCardRoutes;
