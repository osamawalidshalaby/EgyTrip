import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './Components/Navbar.jsx';
  import Home from './page/Home'
import Destination from './Components/Destination.jsx';
import MyBookingsPage from './page/UserDashboard'
import Destinations from './page/Destinations'
import GuideDashboard from './page/GuideDashboard';
import AboutPage from './Components/AboutPage.jsx'
import ContactPage from './Components/ContactPage.jsx'

function App() {
  return (
      
      <Routes>
        <Route path='/navbar' element={<Navbar />} /> 
        <Route path='/' element={<Home />} />
        <Route path='/destination/:id' element={<Destination />} />
        <Route path='/user' element = {<MyBookingsPage />}/>
      <Route path='/destinations' element={<Destinations />} />
     <Route path='/guide-dashboard' element={<GuideDashboard />} />
      
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

  )
}

export default App