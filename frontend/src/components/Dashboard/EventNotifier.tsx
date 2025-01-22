import { useEffect, useState } from "react";
import { toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EventNotifierProps } from "../../interfaces/event.interface";

function EventNotifier({events}: EventNotifierProps): JSX.Element | null {
  const [notifiedEventIds, setNotifiedEventIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (events.length === 0) {
      return; 
    }

    const notifyUpcomingEvents = () => {
      const currentDate = new Date();

      events.forEach((event) => {
        try {
          const eventDate = new Date(event.start.dateTime);
          if (isNaN(eventDate.getTime())) {
            console.error(`Invalid event date: ${event.start.dateTime}`);
            return;
          }

          console.log("Event date:", eventDate);
          console.log(currentDate.getTime());
          
          
          const timeDiff = eventDate.getTime() - currentDate.getTime();
          const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

          if (daysDiff <= 3 && daysDiff > 0 && !notifiedEventIds.has(event.id)) {
            toast.info(
              `Hey! "${event.summary}" is just ${Math.ceil(daysDiff)} day(s) away.`,
              {
                position: "top-right" as ToastPosition,
                autoClose: 5000,
                className: "bg-primary text-white",
              }
            );

            setNotifiedEventIds((prev) => new Set(prev).add(event.id));
          }
        } catch (err) {
          console.error("Error processing event:", err);
        }
      });
    };

    notifyUpcomingEvents();
  }, [events, notifiedEventIds]);

  return null;
};

export default EventNotifier;
