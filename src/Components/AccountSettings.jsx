import React, { useState } from 'react';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    name: 'osama walid',
    email: 'osama walid @gmail.com',
    phone: '01010654258',
    country: 'Egypt'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <h1 className="fw-bold mb-4">Account Settings</h1>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Country</label>
                    <select
                      className="form-select"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option>Egypt</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button type="submit" className="btn btn-info text-white px-4">
                    Save Changes
                  </button>
                  <button type="button" className="btn btn-outline-secondary ms-2">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="rounded-circle bg-secondary mx-auto d-flex align-items-center justify-content-center mb-3"
                   style={{ width: '80px', height: '80px' }}>
                <span className="text-white fs-3">👤</span>
              </div>
              <h5 className="fw-bold">{formData.name}</h5>
              <p className="text-muted">{formData.email}</p>
              <button className="btn btn-outline-primary w-100 mb-2">
                Change Photo
              </button>
              <button className="btn btn-outline-secondary w-100">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;