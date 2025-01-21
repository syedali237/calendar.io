import { useEffect, useState } from 'react';
import { toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Event {
  id: string | number;
  name: string;
  dateTime: string;
}

interface EventNotifierProps {
  events: Event[];
}

const EventNotifier: React.FC<EventNotifierProps> = ({ events }) => {
  const [notificationsSent, setNotificationsSent] = useState<boolean>(false); 

  useEffect(() => {
    if (!notificationsSent){
      const checkUpcomingEvents = () => {
        const currentDate = new Date();
        events.forEach((event) => {
          const eventDate = new Date(event.dateTime);
          const timeDiff = eventDate.getTime() - currentDate.getTime();
          const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
          if (daysDiff <= 3 && daysDiff > 0) {
            toast.info(`Hey! ${event.name} is just ${Math.ceil(daysDiff)} day(s) away.`, {
              position: 'top-right' as ToastPosition,
              className: "bg-[primary]",
              autoClose: 5000,
            });
          }
        });
      };
      checkUpcomingEvents();
    }
    setNotificationsSent(true);
  }, [events]);

  return null; 
};

export default EventNotifier;
