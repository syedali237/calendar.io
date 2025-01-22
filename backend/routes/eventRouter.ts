import express from 'express';
import { getGoogleCalendarEvents } from '../controllers/eventController.ts';

const router = express.Router();

router.get('/events', getGoogleCalendarEvents);

export default router;
