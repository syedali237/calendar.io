import { oauth2client } from '../utils/googleConfig.ts';
import type { Request, Response } from 'express';
import { google } from 'googleapis';
import  EventModel from '../models/eventModel.ts';

export const getGoogleCalendarEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Unauthorized: No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1]; 

    oauth2client.setCredentials({ access_token: token }); 

    const calendar = google.calendar({ version: 'v3', auth: oauth2client });

    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });
    const googleEvents = events.data.items;

    if (!googleEvents) {
      res.status(404).json({ error: "No events found" });
      return;
    }

    const savedEvents = [];
    for (const event of googleEvents) {
      if (event.id && event.start?.dateTime && event.end?.dateTime) {
        const existingEvent = await EventModel.findOne({ eventId: event.id });

        if (!existingEvent) {
          const newEvent = new EventModel({
            eventId: event.id,
            summary: event.summary || "Untitled Event",
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime),
            location: event.location || "N/A",
            description: event.description || "No description",
            hangoutLink: event.hangoutLink || "No Meet Link",
          });

          const savedEvent = await newEvent.save();
          savedEvents.push(savedEvent);
        }
      }
    }
    

    res.status(200).json({ events: events.data.items });
  } catch (error: any) {
    console.error('Error fetching Google Calendar events:', error.message);
    res.status(500).json({ error: 'Failed to fetch events', message: error.message });
  }
};