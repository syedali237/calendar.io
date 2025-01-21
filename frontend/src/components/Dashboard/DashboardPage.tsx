// import { useState } from 'react';
// import searchlogo from '../../assets/search-interface-symbol.png'

// function DashboardPage() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false); 
//   const [selectedOption, setSelectedOption] = useState('Urgency'); 
//   const [selectedCategory, setSelectedCategory] = useState('Work');

//   const handleOptionClick = (option : any) => {
//     setSelectedOption(option);
//     setIsDropdownOpen(false); 
//   };

//   const categories = ['Work', 'Personal', 'Travel'];

//   return (
//     <div className="bg-secondary min-h-screen px-8 py-6">
//       <div className="flex justify-center items-center mb-10">
//         <div className="relative w-full max-w-[600px]">
//         <img src={searchlogo} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"></img>
//           <input
//             type="text"
//             placeholder="Search events, e.g., 'Meetings with John next week'"
//             className="w-full h-[48px] rounded-full border border-black px-12 text-gray-600 text-sm outline-none focus:ring-2 focus:ring-primary bg-secondary"
//           />
//         </div>
//       </div>

//       <div className="flex justify-between items-start">
//         <div>
//           <h2 className="text-[28px] font-bold text-black mb-4">AI Suggestions</h2>
//           <div className="flex space-x-4">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-full font-medium text-sm border ${
//                   selectedCategory === category
//                     ? 'bg-primary text-white border-primary'
//                     : 'bg-transparent text-black border-black'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h2 className="text-[28px] font-bold text-black mb-4">Priority Sorting</h2>
//           <div className="relative">
//             <button
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="px-6 py-2 rounded-full bg-transparent text-black font-medium text-sm border border-black flex items-center"
//             >
//               {selectedOption}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`ml-2 w-4 h-4 transition-transform ${
//                   isDropdownOpen ? 'rotate-180' : ''
//                 }`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//             {isDropdownOpen && (
//               <ul className="absolute top-full mt-2 w-full bg-white border border-black rounded-lg shadow-lg z-10">
//                 {['Newest', 'Oldest', 'A-Z', 'Z-A'].map((option) => (
//                   <li
//                     key={option}
//                     onClick={() => handleOptionClick(option)}
//                     className="px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
//                   >
//                     {option}
//                   </li>
//                 ))}
//               </ul>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;
import { useState } from 'react';
import searchlogo from '../../assets/search-interface-symbol.png';

function DashboardPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const [selectedOption, setSelectedOption] = useState('Urgency');
  const [selectedCategory, setSelectedCategory] = useState('Work');

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const categories = ['Work', 'Personal', 'Travel'];

  return (
    <div className="bg-secondary min-h-screen px-8 py-6">
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
            placeholder="Search events, e.g., 'Meetings with John next week'"
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
                className={`px-4 py-2 rounded-full font-medium text-sm border ${
                  selectedCategory === category
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
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-6 py-2 rounded-full bg-transparent text-black font-medium text-sm border border-black flex items-center"
            >
              {selectedOption}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-2 w-4 h-4 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
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
                {['Newest', 'Oldest', 'A-Z', 'Z-A'].map((option) => (
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
            {/* Example Rows */}
            <tr className="border-b border-primary">
              <td className="px-6 py-4 text-sm text-black">1</td>
              <td className="px-6 py-4 text-sm text-black">Team Meeting</td>
              <td className="px-6 py-4 text-sm text-black">2025-01-22 10:00 AM</td>
              <td className="px-6 py-4 text-sm text-black">New York</td>
            </tr>
            <tr className="border-b border-primary">
              <td className="px-6 py-4 text-sm text-black">2</td>
              <td className="px-6 py-4 text-sm text-black">Project Deadline</td>
              <td className="px-6 py-4 text-sm text-black">2025-01-25 5:00 PM</td>
              <td className="px-6 py-4 text-sm text-black">Online</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardPage;
