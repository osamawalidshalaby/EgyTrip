import { useState } from 'react'
import Navbar from '../Components/Navbar.jsx';
import HeroSection from '../Components/HeroSection.jsx'
import PopularTours from '../Components/PopularTours.jsx'
import Testimonials from '../Components/Testimonials.jsx'
import Footer from '../Components/Footer.jsx'


function Home() {
   const [menuOpen, setMenuOpen] = useState(false);

  const tours = [
    { id: 1, title: 'Giza Pyramids', price: '$200', rating: 4.8, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZU0XOALx0zmUZsQNGDc2o5y7X240ZONPBw&s' },
    { id: 2, title: 'Salah ElDin-Citadel', price: '$350', rating: 4.9, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSovsJiiqS5KzkOQszxzvJ-OV7_RoeiZy18jA&s' },
    { id: 3, title: 'Cairo Tower', price: '$180', rating: 4.7, img: 'https://www.egypttoursportal.com/images/2021/04/Cairo-Tower-Egypt-Tours-Portal-1.jpg' },
    { id: 4, title: 'Moaz-Street', price: '$250', rating: 4.6, img: 'https://lh5.googleusercontent.com/proxy/8jxwP2tE1JRAB98tXb7plB0ZHRwjLs-9FzMpwuFfy2FN8x7zKfsaN98XT73S6DfuIqMSBEdRCcWHgnApinj934ZO3Q4VLlpSINhyB5RR' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Travel Blogger', text: 'This platform made our trip so much easier to plan!', img: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Michael Chen', role: 'Photographer', text: 'I discovered hidden gems thanks to this website!', img: 'https://i.pravatar.cc/150?img=13' },
    { name: 'Emma Williams', role: 'Adventure Seeker', text: 'Amazing experience with professional tour guides.', img: 'https://i.pravatar.cc/150?img=5' }
  ];


  return (
    <div className="font-sans container-fluid p-0 m-0 ">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <PopularTours tours={tours} />
      <Testimonials testimonials={testimonials} />
      <Footer />
    </div>
  )
}

export default Home;