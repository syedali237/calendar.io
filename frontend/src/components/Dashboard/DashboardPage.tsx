import { useEffect, useState } from "react";
import searchlogo from "../../assets/search-interface-symbol.png";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventNotifier from "./EventNotifier";
import { ToastContainer } from "react-toastify";
import EventModal from "./EventModal";
import { Event } from "../../interfaces/event.interface";

function DashboardPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
    const [selectedOption, setSelectedOption] = useState("Choose filter");
    const [selectedCategory, setSelectedCategory] = useState("Work");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    console.log("Events:", events);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);

        const sortedEvents = [...events];
        if (option === "A-Z") {
            sortedEvents.sort((a, b) =>
                a.summary.localeCompare(b.summary)
            );
        } else if (option === "Z-A") {
            sortedEvents.sort((a, b) =>
                b.summary.localeCompare(a.summary)
            );
        } else if (option === "Oldest") {
            sortedEvents.sort(
                (a, b) =>
                    new Date(a.start.dateTime).getTime() -
                    new Date(b.start.dateTime).getTime()
            );
        } else if (option === "Earliest") {
            sortedEvents.sort(
                (a, b) =>
                    new Date(a.start.dateTime).getTime() -
                    new Date(b.start.dateTime).getTime()
            );
        } else if (option === "Remove Filter") {
            setSelectedOption("Choose filter");
            sortedEvents.sort((a, b) => a.id.localeCompare(b.id));
        }
        setEvents(sortedEvents);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = localStorage.getItem("user-info");
                const userData = data ? JSON.parse(data) : null;
                const token = userData.googleAccessToken;
                const response = await axios.get(
                    "http://localhost:8000/calendar/events",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const fetchedEvents = response.data.events;
                fetchedEvents.sort((a: Event, b: Event) => a.id.localeCompare(b.id));
                setEvents(fetchedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const openModal = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const filteredEventsBySearch = searchQuery
        ? events.filter((event) => {
            const eventDate = new Date(event.start.dateTime).toLocaleDateString();
            return (
                event.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (event.location &&
                    event.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
                eventDate.includes(searchQuery)
            );
        })
        : events;


    // Further filter by selected date
    const filteredEvents = selectedDate
        ? filteredEventsBySearch.filter(
            (event) =>
                new Date(event.start.dateTime).toDateString() ===
                selectedDate.toDateString()
        )
        : filteredEventsBySearch;
    
    return (
        <div className="bg-secondary min-h-screen px-8 py-6">
            <ToastContainer />
            <EventNotifier events={events} />

            {/* Search Bar */}
            <div className="flex justify-center items-center mb-10">
                <div className="relative w-full max-w-[600px]">
                    <img
                        src={searchlogo}
                        alt="Search Icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
                    />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search events, e.g., 'Team Meeting, New Delhi, 31/01/2025'"
                        className="w-full h-[48px] rounded-full border border-black px-12 text-gray-600 text-sm outline-none focus:ring-2 focus:ring-primary bg-secondary"
                    />
                </div>
            </div>

            {/* AI Suggestions and Priority Sorting */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h2 className="text-[28px] font-bold text-black mb-4">
                        AI Suggestions
                    </h2>
                    <div className="flex space-x-4">
                        {["Work", "Personal", "Travel"].map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full font-medium text-sm border ${selectedCategory === category
                                    ? "bg-primary text-white border-primary"
                                    : "bg-transparent text-black border-black"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-[28px] font-bold text-black mb-4">
                        Priority Sorting
                    </h2>
                    <div className="flex space-x-4">
                        {/* Date Picker */}
                        <div className="flex items-center space-x-4">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date: any) => setSelectedDate(date)}
                                placeholderText="Select Date"
                                className="px-6 py-2 rounded-full bg-transparent text-black font-medium text-sm border border-black w-[150px]"
                            />
                            {selectedDate && (
                                <button
                                    onClick={() => setSelectedDate(null)}
                                    className="px-4 py-2 rounded-full bg-red-500 text-white font-medium text-sm"
                                >
                                    Clear Date
                                </button>
                            )}
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="px-6 py-2 rounded-full bg-transparent text-black font-medium text-sm border border-black flex items-center w-[165px]"
                            >
                                {selectedOption}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`ml-2 w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute top-full mt-2 w-full bg-white border border-black rounded-lg shadow-lg z-10">
                                    {[
                                        "Earliest",
                                        "A-Z",
                                        "Z-A",
                                        "Remove Filter",
                                    ].map((option) => (
                                        <li
                                            key={option}
                                            onClick={() => handleOptionClick(option)}
                                            className="px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-primary rounded-lg">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold">S.No.</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Event Name</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Date</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Location</th>
                            <th className="px-6 py-3 text-left text-sm font-bold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.map((event, index) => {
                            const eventDate = new Date(event.start.dateTime);
                            const today = new Date();
                            const timeDiff = eventDate.getTime() - today.getTime();
                            const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
                            const isHighlighted = daysDiff > 0 && daysDiff <= 3;

                            return (
                                <tr
                                    key={event.id}
                                    className={`border-b border-primary ${isHighlighted ? "bg-yellow-300" : ""
                                        }`}
                                >
                                    <td className="px-6 py-4 text-sm  ">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-black break-words max-w-xs">{event.summary}</td>
                                    <td className="px-6 py-4 text-sm text-black break-words max-w-xs">
                                        {new Date(event.start.dateTime).toLocaleDateString() || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-black break-words max-w-xs">
                                        {event.location || "N/A"}
                                    </td>
                                    <td>
                                        <button onClick={() => openModal(event)} className="px-4 py-2 rounded-full font-medium text-sm border bg-transparent text-black border-black flex justify-center hover:bg-primary hover:text-white hover:border-primary">
                                            View Event
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

            <EventModal
                isOpen={isModalOpen}
                onClose={closeModal}
                event={selectedEvent}
            />
        </div>
    );
}

export default DashboardPage;
