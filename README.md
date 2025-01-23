# calendar.io

## Purpose
calendar.io is designed to help you organize all your Google Calendar events in one place, providing a seamless and efficient way to manage your schedules and appointments.

---

## Technologies Used
- **Frontend**: ReactJS, TailwindCSS
- **Backend**: NodeJS, ExpressJS
- **Database**: MongoDB
- **Authentication**: Google OAuth2.0
- **API**: Google Calendar API, Google Maps API, Google Gemini API

---

## Installation Instructions

### Prerequisites
- npm (Node Package Manager)
- git
- MongoDB 

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/syedali237/calendar.io
   ```
2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Go to [Google Cloud Console](https://console.cloud.google.com/welcome?_gl=1*8elhwk*_up*MQ..&gclid=Cj0KCQiA7se8BhCAARIsAKnF3rxRruLlIj-zVcINt4KZKtZdwcguPILFjrVRJ7D1nqUXbZR7cJGaNNMaAl0wEALw_wcB&gclsrc=aw.ds&project=secret-410621).
5. Enable the Google Calendar API on your account and set up a Google OAuth2.0 Client ID.
6. Add **Test User Emails** through which you want to access the app.



   <img width="1437" alt="Screenshot 2025-01-23 at 2 55 43 AM" src="https://github.com/user-attachments/assets/3c8f63d4-ce78-49a7-a007-d3b53816f1ff" />
   

7. Obtain the JSON credentials.
8. Obtain the Google Maps API Key and Google Gemini API Key.
9. If you want to test the Contact Us service then setup the [EmailJS](https://www.emailjs.com/) & obtain the credentials necessary. (optional)


### Backend `.env` File Setup
Create a `.env` file in the `backend` directory with the following content:
```
PORT=8000
GOOGLE_CLIENT_ID='YOUR_GOOGLE_CLIENT_ID'
GOOGLE_CLIENT_SECRET='YOUR_GOOGLE_CLIENT_SECRET'
JWT_SECRET=secret
JWT_TIMEOUT=2h
MONGO_URI=mongodb://127.0.0.1:27017/google-login
REDIRECT_URI=http://localhost:8000/auth/google/callback
```

### Frontend `.env` File Setup
Create a `.env` file in the `frontend` directory with the following content:
```
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
VITE_SERVICE_EMAILJS=YOUR_SERVICE_ID_EMAILJS
VITE_TEMPLATE_EMAILJS=YOUR_TEMPLATE_ID_EMAILJS
VITE_PUBLIC_KEY=YOUR_PUBLIC_KEY_EMAILJS
VITE_GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

---

## Usage
After completing the setup, follow these steps to start the application:

1. Navigate to the frontend directory and start the client:
   ```bash
   cd frontend
   npm run dev
   ```
2. Navigate to the backend directory and start the server:
   ```bash
   cd ../backend
   npm start
   ```

---

## Preview


https://github.com/user-attachments/assets/f94519c5-497a-4def-9742-3273212247ad


https://github.com/user-attachments/assets/f954ffce-522f-47ac-a431-1e85fc781f51



---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

Enjoy using **calendar.io** to streamline your Google Calendar events!

