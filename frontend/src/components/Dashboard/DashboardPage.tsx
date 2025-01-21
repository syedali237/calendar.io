import { useEffect, useState } from 'react';
import searchlogo from '../../assets/search-interface-symbol.png';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EventNotifier from './EventNotifier';
import { ToastContainer } from 'react-toastify';

interface Event {
    id: string;
    summary: string;
    start: { dateTime: string };
    end: { dateTime: string };
    location?: string;
}

function DashboardPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
    const [selectedOption, setSelectedOption] = useState('Choose filter');
    const [selectedCategory, setSelectedCategory] = useState('Work');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [eventObjects, setEventObjects] = useState([
        { id: 1, name: 'Team Meeting', dateTime: '2025-01-22 10:00 AM', location: 'New York' },
        { id: 2, name: 'Project Deadline', dateTime: '2025-01-25 5:00 PM', location: 'Online' },
        { id: 3, name: 'Client Call', dateTime: '2025-01-23 3:00 PM', location: 'San Francisco' },
        { id: 4, name: 'Office Party', dateTime: '2025-01-28 7:00 PM', location: 'Chicago' },
        { id: 5, name: 'Annual Review', dateTime: '2025-01-30 1:00 PM', location: 'Online' },
        { id: 6, name: 'Zebronics', dateTime: '2024-12-24 1:00 PM', location: 'Chicago' },
    ]);
    const [events, setEvents] = useState<Event[]>([]);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);

        // Sorting logic
        const sortedEvents = [...eventObjects];
        if (option === 'A-Z') {
            sortedEvents.sort((a, b) => a.name.localeCompare(b.name));
        } else if (option === 'Z-A') {
            sortedEvents.sort((a, b) => b.name.localeCompare(a.name));
        } else if (option === 'Oldest') {
            sortedEvents.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
        } else if (option === 'Earliest') {
            sortedEvents.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
        } else if (option === 'Remove Filter') {
            setSelectedOption('Choose filter');
            sortedEvents.sort((a, b) => a.id - b.id);
        }
        setEventObjects(sortedEvents);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = localStorage.getItem('user-info');
                const userData = data ? JSON.parse(data) : null;
                const token = userData.googleAccessToken;
                const response = await axios.get('http://localhost:8000/calendar/events', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvents(response.data.events);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const categories = ['Work', 'Personal', 'Travel'];

    // Filter events by search query
    const filteredEventsBySearch = searchQuery
        ? eventObjects.filter((event) =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : eventObjects;

    // Further filter by selected date
    const filteredEvents = selectedDate
        ? filteredEventsBySearch.filter(
            (event) => new Date(event.dateTime).toDateString() === selectedDate.toDateString()
        )
        : filteredEventsBySearch;

    return (
        <div className="bg-secondary min-h-screen px-8 py-6">
            <ToastContainer /> 
            <EventNotifier events={eventObjects} />

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
                        placeholder="Search events, e.g., 'Team Meeting'"
                        className="w-full h-[48px] rounded-full border border-black px-12 text-gray-600 text-sm outline-none focus:ring-2 focus:ring-primary bg-secondary"
                    />
                </div>
            </div>

            {/* AI Suggestions and Priority Sorting */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h2 className="text-[28px] font-bold text-black mb-4">AI Suggestions</h2>
                    <div className="flex space-x-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full font-medium text-sm border ${selectedCategory === category
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-transparent text-black border-black'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-[28px] font-bold text-black mb-4">Priority Sorting</h2>
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
                                    className={`ml-2 w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''
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
                                    {['Earliest', 'A-Z', 'Z-A', 'Remove Filter'].map((option) => (
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
                            <th className="px-6 py-3 text-left text-sm font-bold">Date & Time</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.map((event, index) => (
                            <tr key={event.id} className="border-b border-primary">
                                <td className="px-6 py-4 text-sm text-black">{index + 1}</td>
                                <td className="px-6 py-4 text-sm text-black">{event.name}</td>
                                <td className="px-6 py-4 text-sm text-black">{event.dateTime}</td>
                                <td className="px-6 py-4 text-sm text-black">{event.location}</td>
                            </tr>
                        ))}


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
            </div>
        </div>
    );
}

export default DashboardPage;
