// import { google } from 'googleapis';
// import dotenv from 'dotenv';
// dotenv.config();

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;  
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;  


// if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
//     console.error("Google Client ID or Secret is missing. Check your .env file.");
//     process.exit(1);
//   }
  

// export const oauth2client = new google.auth.OAuth2(
//     GOOGLE_CLIENT_ID,
//     GOOGLE_CLIENT_SECRET,
//     'postmessage'
// )

import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'postmessage'; // Keep 'postmessage' for frontend compatibility

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error("Google Client ID or Secret is missing. Check your .env file.");
  process.exit(1);
}

export const oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

export const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

export const generateAuthUrl = () =>
  oauth2client.generateAuthUrl({
    access_type: 'offline', // Ensures refresh token is included
    prompt: 'consent',      // Ensures the user is prompted for permissions
    scope: SCOPES,
  });

export const setToken = async (code: string) => {
  const { tokens } = await oauth2client.getToken(code);
  oauth2client.setCredentials(tokens);
  return tokens;
};

export const getTokenInfo = async (accessToken: string) => {
  return await oauth2client.getTokenInfo(accessToken);
};
