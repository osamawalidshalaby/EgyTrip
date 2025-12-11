
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    country: 'Egypt',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // تحقق من query parameters للتسجيل كـ admin
  const queryParams = new URLSearchParams(location.search);
  const isAdminRegister = queryParams.get('admin') === 'true';

  // إذا كان التسجيل كـ admin، اجعله hidden
  React.useEffect(() => {
    if (isAdminRegister) {
      setIsLogin(false);
      setFormData(prev => ({
        ...prev,
        role: 'admin'
      }));
    }
  }, [isAdminRegister]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        // تسجيل الدخول
        const result = await login(formData.email, formData.password);
        if (result.success) {
          setSuccess('Login successful! Redirecting...');
          
          // توجيه حسب نوع المستخدم
          setTimeout(() => {
            if (result.user.role === 'admin') {
              navigate('/admin-dashboard');
            } else if (result.user.role === 'guide') {
              navigate('/guide-dashboard');
            } else {
              navigate('/user');
            }
          }, 1500);
        } else {
          setError(result.message || 'Invalid email or password');
        }
      } else {
        // التسجيل
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        if (!formData.email || !formData.password) {
          setError('Please fill in all required fields');
          setLoading(false);
          return;
        }

        // إذا كان التسجيل كمستخدم عادي، تأكد من وجود الاسم
        if (formData.role === 'user' && !formData.name) {
          setError('Full name is required for traveler accounts');
          setLoading(false);
          return;
        }

        // إذا كان التسجيل كمرشد، تأكد من وجود الاسم واسم المستخدم
        if (formData.role === 'guide' && (!formData.name || !formData.username)) {
          setError('Full name and username are required for guide accounts');
          setLoading(false);
          return;
        }

        const result = await register(formData);
        if (result.success) {
          setSuccess('Registration successful! Welcome to EgyTrip. Redirecting...');
          setTimeout(() => {
            if (result.user.role === 'admin') {
              navigate('/admin-dashboard');
            } else if (result.user.role === 'guide') {
              navigate('/guide-dashboard');
            } else {
              navigate('/user');
            }
          }, 1500);
        } else {
          setError(result.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ marginTop: '80px' }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-4 p-md-5">
              {/* Header with Logo */}
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary mb-2">
                  {isLogin ? 'Welcome Back' : 'Join EgyTrip'}
                </h2>
                <p className="text-muted">
                  {isLogin ? 'Sign in to your account' : 'Create your account to explore Egypt'}
                </p>
              </div>

              {/* Toggle between Login/Signup */}
              <div className="d-flex mb-4 border rounded overflow-hidden">
                <button
                  className={`btn flex-fill py-3 ${isLogin ? 'btn-primary text-white' : 'btn-light'}`}
                  onClick={() => setIsLogin(true)}
                  disabled={loading || isAdminRegister}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </button>
                <button
                  className={`btn flex-fill py-3 ${!isLogin ? 'btn-primary text-white' : 'btn-light'}`}
                  onClick={() => setIsLogin(false)}
                  disabled={loading || isAdminRegister}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Sign Up
                </button>
              </div>

              {/* Admin Register Notice (إذا كان تسجيل admin) */}
              {isAdminRegister && (
                <div className="alert alert-warning mb-4">
                  <i className="bi bi-shield-check me-2"></i>
                  <strong>Admin Registration</strong>
                  <p className="mb-0 mt-2">You are registering as an administrator. This requires special permissions.</p>
                </div>
              )}

              {/* Error/Success Messages */}
              {error && (
                <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
              )}
              
              {success && (
                <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {success}
                  <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    {/* Full Name */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Full Name {formData.role !== 'admin' && '*'}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required={formData.role !== 'admin'}
                        disabled={loading}
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Username (للمرشدين والمستخدمين العاديين فقط) */}
                    {(formData.role === 'user' || formData.role === 'guide') && (
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Username *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="Choose a username"
                        />
                        <div className="form-text">This will be your public display name</div>
                      </div>
                    )}
                  </>
                )}

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder={isLogin ? "Enter your password" : "Create a password (min. 6 characters)"}
                  />
                </div>

                {!isLogin && (
                  <>
                    {/* Phone Number */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="+20 123 456 7890"
                      />
                    </div>

                    {/* Country */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Country</label>
                      <select
                        className="form-select"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={loading}
                      >
                        <option value="Egypt">Egypt</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Account Type (إخفاءه إذا كان تسجيل admin) */}
                    {!isAdminRegister && (
                      <div className="mb-4">
                        <label className="form-label fw-semibold">I want to join as:</label>
                        <div className="d-flex flex-column flex-md-row gap-3">
                          <div className="form-check border rounded p-3 flex-fill">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              value="user"
                              checked={formData.role === 'user'}
                              onChange={handleChange}
                              disabled={loading}
                              id="role-user"
                            />
                            <label className="form-check-label w-100" htmlFor="role-user">
                              <div className="fw-medium">Traveler</div>
                              <small className="d-block text-muted">Book tours and explore Egypt</small>
                            </label>
                          </div>
                          <div className="form-check border rounded p-3 flex-fill">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              value="guide"
                              checked={formData.role === 'guide'}
                              onChange={handleChange}
                              disabled={loading}
                              id="role-guide"
                            />
                            <label className="form-check-label w-100" htmlFor="role-guide">
                              <div className="fw-medium">Tour Guide</div>
                              <small className="d-block text-muted">Offer tours and share expertise</small>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Terms and Conditions */}
                    <div className="mb-4 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="terms"
                        required
                        disabled={loading}
                      />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to the <Link to="/terms" className="text-decoration-none">Terms of Service</Link> and <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>
                      </label>
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-3 fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Sign In
                        </>
                      ) : (
                        <>
                          <i className="bi bi-person-plus me-2"></i>
                          Create Account
                        </>
                      )}
                    </>
                  )}
                </button>

                {/* Switch between Login/Signup */}
                <div className="text-center mt-4">
                  <p className="mb-0">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      type="button"
                      className="btn btn-link p-0 ms-2 text-decoration-none"
                      onClick={() => setIsLogin(!isLogin)}
                      disabled={loading || isAdminRegister}
                    >
                      <strong>{isLogin ? 'Sign Up' : 'Sign In'}</strong>
                    </button>
                  </p>
                </div>

                {/* Forgot Password */}
                {isLogin && (
                  <div className="text-center mt-3">
                    <Link to="/forgot-password" className="text-decoration-none">
                      Forgot your password?
                    </Link>
                  </div>
                )}
              </form>

              {/* Demo Accounts Info */}
              <div className="card border-light mt-4">
                <div className="card-body p-3">
                  <h6 className="fw-bold mb-2">
                    <i className="bi bi-info-circle me-2"></i>
                    Demo Accounts
                  </h6>
                  <div className="row small">
                    <div className="col-md-6">
                      <div className="mb-2">
                        <strong>Traveler:</strong><br/>
                        <code>osama@example.com</code><br/>
                        <code>password123</code>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-2">
                        <strong>Tour Guide:</strong><br/>
                        <code>guide@example.com</code><br/>
                        <code>guide123</code>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <strong>Admin:</strong><br/>
                    <code>admin@egyptrip.com</code><br/>
                    <code>admin123</code>
                  </div>
                </div>
              </div>

              {/* Back to Home */}
              <div className="text-center mt-4 pt-3 border-top">
                <Link to="/" className="text-decoration-none text-muted">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;