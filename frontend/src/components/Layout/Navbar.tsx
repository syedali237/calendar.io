import {useGoogleLogin} from '@react-oauth/google'
import { googleAuth } from '../../api';
import {useNavigate} from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();

  const responseGoogle = async (response: any) => {
    try {
      if (response['code']) {
        const result = await googleAuth(response['code']);
        const {email, name, image} = result.data.user;
        const token = result.data.token;
        const obj = {email, name, image, token};
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
  })
  
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
          <button onClick={googleLogin} className="bg-primary text-[#ffffff] px-4 py-2 rounded-[36px] w-[90px] h-[33.1px] ml-[39px] flex items-center justify-center">
            Log In
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
