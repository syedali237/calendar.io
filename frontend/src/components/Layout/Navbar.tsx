import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserInfo } from "../../interfaces/event.interface";

function Navbar() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const responseGoogle = async (response: any) => {
    try {
      if (response["code"]) {
        const result = await googleAuth(response["code"]);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const googleAccessToken = result.data.googleAccessToken;
        const obj = { email, name, image, token, googleAccessToken };
        localStorage.setItem("user-info", JSON.stringify(obj));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error while requesting ", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
  });

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const userData = data ? JSON.parse(data) : null;
    setUserInfo(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    setUserInfo(null);
    navigate("/");
  };

  return (
    <div>
      <nav className="flex items-center py-[18px] text-[#000000] bg-[#ffffff] text-[16px]">
        <Link to="/" className="ml-[32px]">calendar.io</Link>
        <div className="flex flex-grow justify-end items-center mr-[34px]">
          {userInfo ? (
            <div className="relative flex items-center">
              <div className="mr-[40px]">
                <Link
                  to="/dashboard"
                  className="ml-[39px] hover:text-primary transition-all"
                >
                  Dashboard
                </Link>
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <span className="mr-[10px]">{userInfo.name}</span>
                <img
                  src={userInfo.image}
                  alt="User Avatar"
                  className="w-[40px] h-[40px] rounded-full mr-2"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 top-11 mt-2 bg-white border rounded shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <a
                href="#"
                className="ml-[32px] hover:text-primary transition-all"
              >
                Features
              </a>
              <a
                href="#"
                className="ml-[39px] hover:text-primary transition-all"
              >
                Dashboard
              </a>
              <button
                onClick={googleLogin}
                className="bg-primary text-[#ffffff] px-4 py-2 rounded-[36px] w-[90px] h-[33.1px] ml-[39px] flex items-center justify-center"
              >
                Log In
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
