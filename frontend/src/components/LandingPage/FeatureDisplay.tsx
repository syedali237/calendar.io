import searchIcon from "../../assets/search-interface-symbol.png";
import bulbIcon from "../../assets/icons8-bulb-100.png";
import calendarIcon from "../../assets/calendar.png";

function FeaturesDisplay() {
  return (
    <div className="bg-primary text-white py-10" data-aos="fade-up"  data-aos-delay="50">
      <h2 className="text-center text-[32px] font-bold mb-8" data-aos="fade-up"  data-aos-delay="100">
        A better way to manage your time
      </h2>

      <div className="bg-secondary max-w-[1200px] mx-auto rounded-[36px] px-8 py-6 flex justify-between items-center shadow-lg space-x-2" data-aos="fade-up"  data-aos-delay="100">
        <div className="flex items-center space-x-4">
          <div className="text-black">
            <img src={searchIcon} className="w-14 h-14 object-contain" alt="Search Icon"
            ></img>
          </div>
          <div>
            <h3 className="text-black text-lg font-bold">Advanced Search</h3>
            <p className="text-gray-700">
              Search smarter, not harder. Use natural language to find events
              instantly.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-black">
            <img src={bulbIcon} className="w-15 h-15 object-contain" alt="Bulb Icon"
            ></img>
          </div>
          <div>
            <h3 className="text-black text-lg font-bold">AI Insights</h3>
            <p className="text-gray-700">
            Get smart event location suggestions with preferred transport recommendations.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-black">
            <img src={calendarIcon} className="w-[4rem] h-[4rem] object-contain" alt="Search Icon"
            ></img>
          </div>
          <div>
            <h3 className="text-black text-lg font-bold">Events Sorting</h3>
            <p className="text-gray-700">
              Filter your events by date, earliest and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesDisplay;