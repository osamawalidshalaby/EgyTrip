import React from 'react';
import GuideSidebar from '../Components/GuideSidebar';
import BookingsChart from '../Components/BookingsChart';
import { Search, Bell, DollarSign, Calendar, Star, Flag } from 'react-feather';

const StatsCard = ({ title, value, percentage, icon, isPositive }) => (
  <div className="card border-0 shadow-sm p-3 h-100">
    <div className="d-flex justify-content-between align-items-start">
      <div>
        <p className="text-muted mb-1 small">{title}</p>
        <h4 className="fw-bold mb-2">{value}</h4>
        <small className={isPositive ? "text-success" : "text-danger"}>
           {percentage} <span className="text-muted">vs. last month</span>
        </small>
      </div>
      <div className="bg-light p-2 rounded text-secondary">
        {icon}
      </div>
    </div>
  </div>
);

const GuideDashboard = () => {
  return (
    <div className="container-fluid p-0 bg-light min-vh-100">
      <div className="d-flex">
        
        {/* Sidebar Section */}
        <div className="d-none d-md-block">
            <GuideSidebar />
        </div>

        {/* Main Content Section */}
        <div className="flex-grow-1 p-4" style={{ marginLeft: '250px' }}> {/* Margin matches sidebar width */}
            
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 className="fw-bold">Overview & Analytics</h2>
                    <p className="text-muted">Here's a summary of your activity in the last 30 days.</p>
                </div>
                
                <div className="d-flex gap-3 align-items-center">
                    <div className="input-group" style={{maxWidth: '300px'}}>
                        <span className="input-group-text bg-white border-end-0"><Search size={18}/></span>
                        <input type="text" className="form-control border-start-0" placeholder="Search tours, bookings..." />
                    </div>
                    <button className="btn btn-white position-relative border bg-white p-2">
                        <Bell size={20} />
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                    </button>
                    <button className="btn btn-success text-white px-4">+ Add New Tour</button>
                </div>
            </div>

            {/* Stats Cards Row */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <StatsCard title="Total Revenue" value="$12,450" percentage="+12.5%" isPositive={true} icon={<DollarSign />} />
                </div>
                <div className="col-md-3">
                    <StatsCard title="Upcoming Bookings" value="18" percentage="+5.8%" isPositive={true} icon={<Calendar />} />
                </div>
                <div className="col-md-3">
                    <StatsCard title="New Reviews" value="6" percentage="-2.1%" isPositive={false} icon={<Star />} />
                </div>
                <div className="col-md-3">
                    <StatsCard title="Total Tours" value="25" percentage="+1 Active" isPositive={true} icon={<Flag />} />
                </div>
            </div>

            {/* Middle Section (Charts & Revenue) */}
            <div className="row g-4 mb-4">
                {/* Bookings Trend Placeholder */}
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm p-4 h-100">
                        <div className="d-flex justify-content-between mb-4">
                            <h5 className="fw-bold">Bookings Trend</h5>
                            <span className="text-success fw-bold">152 Bookings</span>
                        </div>
                        {/* Chart */}
                       <div style={{height: '300px', width: '100%'}}>
                            <BookingsChart />
                        </div>
                    </div>
                </div>

                {/* Revenue List */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-4 h-100">
                        <h5 className="fw-bold mb-4">Revenue by Tour</h5>
                        
                        {/* List Items */}
                        {['Alpine Hiking', 'Coastal Kayaking', 'City Food Tour', 'Historical Walk'].map((tour, idx) => (
                            <div key={idx} className="mb-4">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="fw-semibold small">{tour}</span>
                                    <span className="text-muted small">${4000 - (idx * 500)}</span>
                                </div>
                                <div className="progress" style={{height: '6px'}}>
                                    <div className="progress-bar bg-success" style={{width: `${80 - (idx * 15)}%`}}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="card border-0 shadow-sm p-4">
                <h5 className="fw-bold mb-3">Recent Booking Activities</h5>
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="border-0 text-muted small">TRAVELER NAME</th>
                                <th className="border-0 text-muted small">TOUR</th>
                                <th className="border-0 text-muted small">DATE</th>
                                <th className="border-0 text-muted small">STATUS</th>
                                <th className="border-0 text-muted small">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="fw-bold py-3">John Doe</td>
                                <td>Alpine Hiking</td>
                                <td>2023-10-25</td>
                                <td><span className="badge bg-success bg-opacity-10 text-success px-3">Confirmed</span></td>
                                <td><a href="#" className="text-info text-decoration-none small fw-bold">View Details</a></td>
                            </tr>
                            <tr>
                                <td className="fw-bold py-3">Jane Smith</td>
                                <td>Coastal Kayaking</td>
                                <td>2023-11-05</td>
                                <td><span className="badge bg-warning bg-opacity-10 text-warning px-3">Pending</span></td>
                                <td><a href="#" className="text-info text-decoration-none small fw-bold">View Details</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;