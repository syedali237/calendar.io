import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='bg-secondary flex flex-col items-center justify-center h-screen'>
      <h1 className='my-[80px] text-4xl'>404 : Page Not Found</h1>
      <button className="bg-primary text-white rounded-[36px] w-[200px] h-[60px] hover:bg-white hover:text-primary" onClick={() => navigate('/')}>Back to Home Page</button>
    </div>
  )
}

export default NotFound;