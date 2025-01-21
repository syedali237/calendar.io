// import {oauth2client} from '../utils/eventConfig.ts';
// import type { Request, Response } from 'express';
// import { google } from 'googleapis';

// export const getGoogleCalendarEvents = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       res.status(401).json({ error: 'Unauthorized: No token provided' });
//       return;
//     }

//     // Extract the token from the Authorization header
//     const token = authHeader.split(' ')[1]; // This is the raw token after "Bearer"

//     if (!token) {
//       res.status(401).json({ error: 'Unauthorized: Invalid token format' });
//       return;
//     }

//     console.log('Access Token:', token);

//     // Set up Google OAuth2 client
//     // const oauth2Client = new google.auth.OAuth2();
//     oauth2client.setCredentials({ access_token: token });

//     // Initialize Google Calendar API
//     const calendar = google.calendar({ version: 'v3', auth: oauth2client });

//     // Fetch events
//     const events = await calendar.events.list({
//       calendarId: 'primary',
//       timeMin: new Date().toISOString(),
//       singleEvents: true,
//       orderBy: 'startTime',
//     });

//     res.status(200).json({ events: events.data.items });
//   } catch (error: any) {
//     console.error('Error fetching Google Calendar events:', error.message);
//     res.status(500).json({ error: 'Failed to fetch events', message: error.message });
//   }
// };

import { oauth2client } from '../utils/googleConfig.ts';
import type { Request, Response } from 'express';
import { google } from 'googleapis';

export const getGoogleCalendarEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Unauthorized: No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1]; // Extract token from header
    console.log('Access Token:', token);

    oauth2client.setCredentials({ access_token: token }); // Set access token

    const calendar = google.calendar({ version: 'v3', auth: oauth2client });

    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    res.status(200).json({ events: events.data.items });
  } catch (error: any) {
    console.error('Error fetching Google Calendar events:', error.message);
    res.status(500).json({ error: 'Failed to fetch events', message: error.message });
  }
};
