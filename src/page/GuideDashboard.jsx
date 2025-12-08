import React, { useState } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../Components/Navbar.jsx';

const revenueByTour = [
  { name: "Nour Mostafa", revenue: 1200 },
  { name: "Ahmed Ali", revenue: 950 },
  { name: "Sara Hassan", revenue: 800 },
  { name: "Omar Khaled", revenue: 650 },
  { name: "Lina Youssef", revenue: 500 },
];

const ratingDistribution = [
  { name: "5 Stars", value: 60 },
  { name: "4 Stars", value: 25 },
  { name: "3 Stars", value: 10 },
  { name: "2 Stars", value: 3 },
  { name: "1 Star", value: 2 },
];

const guides = [
  { name: "Ahmed Mahmoud", specialty: "Cairo & Giza", experience: "10 years", price: 500, img: "https://media.istockphoto.com/id/855413388/photo/theres-so-much-to-see.jpg?s=612x612&w=0&k=20&c=0pYgKJ46BH8ziQ31CMEQFSNNcvJ5P1RIwiKMHNWDr1A=" },
  { name: "Sara Abdullah", specialty: "Alexandria", experience: "7 years", price: 450, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIWOtT37vuKAIGPQO3zEeAo4vLdLWS_NiSFg&s" },
  { name: "Mohamed Hassan", specialty: "Luxor & Aswan", experience: "12 years", price: 600, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC5wr92r0RAXClAUIxNORNFJN7eONZ3h-wfw&s" },
  { name: "Nourhan Ali", specialty: "Sharm El-Sheikh", experience: "8 years", price: 550, img: "https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/039/128/medium/ff67fc24817aa0f0f8efb70ebf335ca8/tile-guide-ioanna-papakosta.jpg" },
];

const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0"];

const GuideDashboard = () => {
    const [menuOpen, setMenuOpen] = useState(false); 
  return (

    <div>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    
      <div className="bg-primary text-white text-center py-5 mb-4">
        <h1>Guide Dashboard</h1>
        <p>Your perfect platform to manage guides and bookings</p>
        <button className="btn btn-light mt-2">Add New Guide</button>
      </div>

      <div className="container">
     
        <div className="row text-center mb-4">
          <div className="col-md-3 mb-3">
            <div className="card shadow">
              <div className="card-body">
                <h5>Total Tours</h5>
                <h3>48</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card shadow">
              <div className="card-body">
                <h5>Total Bookings</h5>
                <h3>312</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card shadow">
              <div className="card-body">
                <h5>Total Earnings</h5>
                <h3>$12,450</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card shadow">
              <div className="card-body">
                <h5>Upcoming Tours</h5>
                <h3>7</h3>
              </div>
            </div>
          </div>
        </div>

       
        <h2 className="mb-3">Meet Some of Our Guides</h2>
        <div className="row">
          {guides.map((guide, idx) => (
            <div key={idx} className="col-md-3 mb-4">
              <div className="card h-100 shadow">
                <img src={guide.img} className="card-img-top" alt={guide.name} />
                <div className="card-body">
                  <h5 className="card-title">{guide.name}</h5>
                  <p className="card-text">
                    <strong>Specialty:</strong> {guide.specialty} <br />
                    <strong>Experience:</strong> {guide.experience} <br />
                    <strong>Price:</strong> {guide.price} EGP/day
                  </p>
                  <button className="btn btn-primary w-100">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="row mb-4">
          <div className="col-lg-6 mb-4">
            <div className="card shadow p-3">
              <h5>Revenue by Tour Guide</h5>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueByTour}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue">
                    {revenueByTour.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="card shadow p-3">
              <h5>Rating Distribution</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={ratingDistribution} dataKey="value" outerRadius={80} label>
                    {ratingDistribution.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        
        <div className="card shadow mb-4">
          <div className="card-body">
            <h5 className="mb-3">Recent Bookings</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Tour</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mohamed Salah</td>
                  <td>Giza Pyramids</td>
                  <td>2025-06-15</td>
                  <td><span className="badge bg-success">Confirmed</span></td>
                </tr>
                <tr>
                  <td>Alaa Ahmed</td>
                  <td>Luxor Trip</td>
                  <td>2025-07-23</td>
                  <td><span className="badge bg-warning">Pending</span></td>
                </tr>
                <tr>
                  <td>Sara Hassan</td>
                  <td>Nile Cruise</td>
                  <td>2025-08-17</td>
                  <td><span className="badge bg-primary">Completed</span></td>
                </tr>
                <tr>
                  <td>Mona Tarek</td>
                  <td>Alexandria Trip</td>
                  <td>2025-09-20</td>
                  <td><span className="badge bg-danger">Cancelled</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    
      <div className="bg-primary text-white text-center py-5 mt-4">
        <h4>Ready to Start Your Adventure?</h4>
        <p>Choose your favorite governorate and book a tour guide now!</p>
        <button className="btn btn-light mt-2">Start Booking</button>
      </div>
    </div>
  );
};

export default GuideDashboard;
