
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './page/Home'
import MyBookingsPage from './page/UserDashboard'
import ToursListingPage from './page/Destination'
import GuideDashboard from './page/GuideDashboard'
export function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home />}/>
        <Route path='/user' element = {<MyBookingsPage />}/>
        <Route path='/destination' element = {<ToursListingPage />}/>
        <Route path='/guide' element = {<GuideDashboard />}/>
      </Routes>
    </Router>
  )
}

export default App
