import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;  
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;  


if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    console.error("Google Client ID or Secret is missing. Check your .env file.");
    process.exit(1);
  }
  

export const oauth2client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'postmessage'
)