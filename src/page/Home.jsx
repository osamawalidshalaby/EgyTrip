import { useState } from 'react'
import Navbar from '../Components/Navbar.jsx'
import HeroSection from '../Components/HeroSection.jsx'
import PopularTours from '../Components/PopularTours.jsx'
import Testimonials from '../Components/Testimonials.jsx'
import Footer from '../Components/Footer.jsx'


function Home() {
   const [menuOpen, setMenuOpen] = useState(false);

  const tours = [
    { id: 1, title: 'Paris Sightseeing Adventure', price: '$200', rating: 4.8, img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
    { id: 2, title: 'Ancient City Cultural Tour', price: '$350', rating: 4.9, img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400' },
    { id: 3, title: 'Crystal Beach Exploration', price: '$180', rating: 4.7, img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
    { id: 4, title: 'Mountain Trail Hiking', price: '$250', rating: 4.6, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' }
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

export default Home