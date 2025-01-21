import { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
  location?: string;
}

const EventsTable = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = localStorage.getItem('user-info'); // Replace with your method to store the token
        const userData = data ? JSON.parse(data) : null;
        const token = userData.googleAccessToken        ; // Extract the token
        const response = await axios.get('http://localhost:8000/calendar/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Event</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <td>{event.summary}</td>
            <td>{new Date(event.start.dateTime).toLocaleString()}</td>
            <td>{new Date(event.end.dateTime).toLocaleString()}</td>
            <td>{event.location || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventsTable;
