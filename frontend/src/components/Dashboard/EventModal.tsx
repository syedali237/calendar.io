import { useState, useEffect } from "react";
import { EventModalProps } from "../../interfaces/event.interface";
import TravelTimeService from "../../../src/services";

function EventModal({ isOpen, onClose, event }: EventModalProps): JSX.Element | null {
    const [travelEstimation, setTravelEstimation] = useState<{
        travelTime: number;
        distance: number;
        transportMode: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTravelTime = async () => {
            if (isOpen && event && event.location) {
                setIsLoading(true);
                try {
                    const estimation = await TravelTimeService.estimateTravelTime(event);
                    setTravelEstimation(estimation);
                } catch (error) {
                    console.error("Travel time estimation failed", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchTravelTime();
    }, [isOpen, event]);

    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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

                {/* Travel Time Estimation Section */}
                {isLoading ? (
                    <p className="mt-4 text-gray-500">Estimating travel time...</p>
                ) : travelEstimation ? (
                    <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                        <strong>Travel Estimation:</strong>
                        <p>
                            Distance: {travelEstimation.distance.toFixed(2)} km
                            <br />
                            Estimated Travel Time: {travelEstimation.travelTime.toFixed(0)} minutes
                            <br />
                            Transport Mode: {travelEstimation.transportMode}
                        </p>
                    </div>
                ) : null}

                {event.hangoutLink && (
                    <p className="mt-4">
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
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default EventModal;