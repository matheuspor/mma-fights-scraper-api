import { Router } from 'express';
import { getAll } from '../controllers/fight-controller';

const fightsRoutes = Router();

fightsRoutes.get('/fights', getAll);

export default fightsRoutes;
