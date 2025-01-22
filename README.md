# calendar.io

## Purpose
calendar.io is designed to help you organize all your Google Calendar events in one place, providing a seamless and efficient way to manage your schedules and appointments.

---

## Technologies Used
- **Frontend**: ReactJS, TailwindCSS
- **Backend**: NodeJS, ExpressJS
- **Database**: MongoDB
- **Authentication**: Google OAuth2.0
- **API**: Google Calendar API

---

## Installation Instructions

### Prerequisites
- npm (Node Package Manager)
- git
- MongoDB installed on your local system

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
4. Enable the Google Calendar API on your account and set up a Google OAuth2.0 Client ID.
5. Add **Test User Emails** through which you want to access the app.
   
   <img width="1437" alt="Screenshot 2025-01-23 at 2 55 43 AM" src="https://github.com/user-attachments/assets/3c8f63d4-ce78-49a7-a007-d3b53816f1ff" />
   
6. Obtain the JSON credentials.

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


---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

Enjoy using **calendar.io** to streamline your Google Calendar events!

