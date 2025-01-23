import calendar from '../../assets/calendar_logo.png';
import { useGoogleLogin } from '@react-oauth/google'
import { googleAuth } from '../../api';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { UserInfo } from '../../interfaces/event.interface';

function ProductDisplay() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const navigate = useNavigate();

  const responseGoogle = async (response: any) => {
    try {
      if (response['code']) {
        const result = await googleAuth(response['code']);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const googleAccessToken = result.data.googleAccessToken;
        const obj = { email, name, image, token, googleAccessToken };
        localStorage.setItem('user-info', JSON.stringify(obj));
        navigate('/dashboard');
      }
    } catch (error) {
      console.log("Error while reuqesting ", error);
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
    scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
  })

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const userData = data ? JSON.parse(data) : null;
    setUserInfo(userData);
  }, []);

  return (
    <div className="bg-secondary w-full h-[410px] mx-auto flex px-[75px] justify-between">

      <div className="flex flex-col mt-[120px]" data-aos="fade-up"  data-aos-delay="100">
        <h1 className="text-[48px] font-bold text-black mb-[14px]">
          Your Calendar, Smarter
        </h1>
        <p className="text-[18px] text-gray-600 leading-[1.4]">
          Simplify your event scheduling with AI-powered insights and advanced search
          <br />
          tools designed for your busy life.
        </p>
        {!userInfo ? (
          <button onClick={googleLogin} className="bg-primary text-white rounded-[36px] flex items-center justify-center px-6 py-2 mt-[14px] text-[16px] w-[169px] h-[33.5px]">
            Get Started
          </button>
        ) : null}
      </div>

      <div className="flex items-center mr-[110px]" data-aos="fade-up"  data-aos-delay="100">
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
