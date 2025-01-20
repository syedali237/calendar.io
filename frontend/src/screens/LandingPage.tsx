import FeaturesDisplay from '../components/LandingPage/FeatureDisplay'
import Navbar from '../components/Layout/Navbar'
import ProductDisplay from '../components/LandingPage/ProductDisplay'
import Footer from '../components/Layout/Footer'

function LandingPage() {
  return (
    <div className='h-screen '>
        <Navbar /> 
        <ProductDisplay />
        <FeaturesDisplay />
        <Footer />
    </div>
  )
}

export default LandingPage