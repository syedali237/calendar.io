function FeaturesDisplay() {
    return (
      <div className="bg-primary text-white py-10">
        <h2 className="text-center text-[32px] font-bold mb-8">
          A better way to manage your time
        </h2>

        <div className="bg-secondary max-w-[1200px] mx-auto rounded-[36px] px-8 py-6 flex justify-between items-center shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-4-1 7 7 0 014-1z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-black text-lg font-bold">Advanced Search</h3>
              <p className="text-gray-700">
                Search smarter, not harder. Use natural language to find events
                instantly.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-black text-lg font-bold">AI Insights</h3>
              <p className="text-gray-700">
                Get actionable suggestions and auto-categorization for your
                events.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a1 1 0 012-1h4a1 1 0 011 1v4m-6 6H4a1 1 0 01-1-1V8a1 1 0 011-1h4m8 0h4a1 1 0 011 1v4a1 1 0 01-1 1h-4m-4 4v4a1 1 0 001 1h4a1 1 0 001-1v-4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-black text-lg font-bold">AI Insights</h3>
              <p className="text-gray-700">
                Rank your events by urgency or relevance with AI-driven
                algorithms.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default FeaturesDisplay;
  