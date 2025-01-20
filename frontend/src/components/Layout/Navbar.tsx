function Navbar() {
  return (
    <div>
      <nav className="flex items-center py-[18px] text-[#000000] bg-[#ffffff] text-[16px]">
        <p className="ml-[32px]">calendar.io</p>
        <div className="flex flex-grow justify-end items-center mr-[34px]">
          <a href="#" className="ml-[32px] hover:text-primary transition-all">
            Features
          </a>
          <a href="#" className="ml-[39px] hover:text-primary transition-all">
            Dashboard
          </a>
          <button className="bg-primary text-[#ffffff] px-4 py-2 rounded-[36px] w-[90px] h-[33.1px] ml-[39px] flex items-center justify-center">
            Log In
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
