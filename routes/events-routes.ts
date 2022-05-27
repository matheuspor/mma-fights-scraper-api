import { Router } from 'express';
import { getAll } from '../controllers/event-controller';

const eventsRoutes = Router();

eventsRoutes.get('/events', getAll);

export default eventsRoutes;
