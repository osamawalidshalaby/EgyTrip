import Card from "./Card";

import HeroSection from './HeroSection'
import Header from "./Header";
import EgyTripFooter from "./Footer";

export default function App() {
  const cards = [
    {title : 'Cairo, Siwa & Alexandria Adventure' , 
      image : '/public/siwa.webp',
      price : '1200$'
    },
    {title : 'Pharaoh\'s Journey' , 
      image : '/public//discover.webp',
      price : '500$'
    },
    {title : 'Discover the Wonders of Ancient Egypt' , 
      image : '/public/pharao.webp',
      price : '600$'
    },
  ]
  return (
    <>
    <Header />
    <main>
    <HeroSection />
    <div class="container-custom">
        <h1>Discover Ancient Egypt</h1>
        <div class="row g-4">
         {cards.map(card => (
          <Card card = {card}/>
         ))}
        </div>
    </div>
    </main>
    <EgyTripFooter />
    </>
  )
}