import calendar from '../../assets/calendar_logo.png';

function ProductDisplay() {
  return (
    <div className="bg-secondary w-full h-[410px] mx-auto flex px-[75px] justify-between">

      <div className="flex flex-col mt-[120px]">
        <h1 className="text-[48px] font-bold text-black mb-[14px]">
          Your Calendar, Smarter
        </h1>
        <p className="text-[18px] text-gray-600 leading-[1.4]">
          Simplify your scheduling with AI-powered insights and advanced search
          <br />
          tools designed for your busy life.
        </p>
        <button className="bg-primary text-white rounded-[36px] flex items-center justify-center px-6 py-2 mt-[14px] text-[16px] w-[169px] h-[33.5px]">
          Get Started
        </button>
      </div>

      <div className="flex items-center mr-[110px]">
        <img
          src={calendar}
          alt="Calendar Illustration"
          className="w-[372.9px] h-auto"
        />
      </div>
    </div>
  );
}

export default ProductDisplay;
