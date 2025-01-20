import LandingPage from "./screens/LandingPage";
import NotFound from "./components/PageNotFound/NotFound";
import Dashboard from "./screens/Dashboard";
import {BrowserRouter, Route , Routes , Navigate} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {

  function ProtectedRoute({ children }: { children: JSX.Element }) {
    const userInfo = localStorage.getItem("user-info");
    return userInfo ? children : <Navigate to="/" />;
  }

  return (
    <GoogleOAuthProvider clientId="574182886829-3sfkn0frp5d76pc3mv3e9vh9srgaq757.apps.googleusercontent.com">
      <div className="font-poppins">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
