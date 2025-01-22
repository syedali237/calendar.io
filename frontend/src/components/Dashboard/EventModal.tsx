import { EventModalProps } from "../../interfaces/event.interface";

function EventModal({ isOpen, onClose, event }: EventModalProps): JSX.Element | null {
    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 text-center">{event.summary || "No Title"}</h2>
                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(event.start.dateTime).toLocaleDateString() || "N/A"}
                </p>
                {event.description && (
                    <p>
                        <strong>Description:</strong>{" "}
                        {event.description}
                    </p>
                )}
                <p>
                    <strong>Timings:</strong>{" "}
                    {new Date(event.start.dateTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    }) || "N/A"}
                    <strong> -</strong>{" "}
                    {new Date(event.end.dateTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    }) || "N/A"}
                </p>
                <p>
                    <strong>Location:</strong> {event.location || "N/A"}
                </p>
                {event.hangoutLink && (
                    <p>
                        <strong>Meet Link:</strong>{" "}
                        <a
                            href={event.hangoutLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            {event.hangoutLink}
                        </a>
                    </p>
                )}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default EventModal;
