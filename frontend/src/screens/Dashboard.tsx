import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  name: string;
  email: string;
  image: string;
}

function Dashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    const userData = data ? JSON.parse(data) : null;
    setUserInfo(userData);
  },[])

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/');
  }

  return (
    <div>
    <h1>Welcome {userInfo?.name}</h1>
    <h3>Email : {userInfo?.email}</h3>
    <img src={userInfo?.image} alt={userInfo?.email}></img>
    <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Dashboard