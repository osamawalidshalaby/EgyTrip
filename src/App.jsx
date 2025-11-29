
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './page/Home'
import MyBookingsPage from './page/UserDashboard'
import ToursListingPage from './page/Destination'

export function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home />}/>
        <Route path='/user' element = {<MyBookingsPage />}/>
        <Route path='/destination' element = {<ToursListingPage />}/>
        
      </Routes>
    </Router>
  )
}

export default App
