import express from 'express';
import { getGoogleCalendarEvents } from '../controllers/eventController.ts';

const router = express.Router();

// Define the route to fetch Google Calendar events
router.get('/events', getGoogleCalendarEvents);

export default router;
