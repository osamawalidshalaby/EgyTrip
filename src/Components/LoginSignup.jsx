import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
          setTimeout(() => {
            navigate(result.user.role === 'guide' ? '/guide-dashboard' : '/user');
          }, 1500);
        } else {
          setError(result.message);
        }
      } else {
        // التسجيل
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        if (!formData.name || !formData.email || !formData.username) {
          setError('Please fill in all required fields');
          setLoading(false);
          return;
        }

        const result = await register(formData);
        if (result.success) {
          setSuccess('Registration successful! Welcome to EgyTrip. Redirecting...');
          setTimeout(() => {
            navigate(result.user.role === 'guide' ? '/guide-dashboard' : '/user');
          }, 1500);
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Auth error:', err);
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
              <h2 className="text-center mb-4 fw-bold text-primary">
                {isLogin ? 'Welcome Back to EgyTrip' : 'Join Our Community'}
              </h2>
              <p className="text-center text-muted mb-4">
                {isLogin ? 'Sign in to your account' : 'Create your free account'}
              </p>

              {/* Toggle بين Login/Signup */}
              <div className="d-flex mb-4 border rounded overflow-hidden">
                <button
                  className={`btn flex-fill py-3 ${isLogin ? 'btn-primary' : 'btn-light'}`}
                  onClick={() => setIsLogin(true)}
                  disabled={loading}
                >
                  Login
                </button>
                <button
                  className={`btn flex-fill py-3 ${!isLogin ? 'btn-primary' : 'btn-light'}`}
                  onClick={() => setIsLogin(false)}
                  disabled={loading}
                >
                  Sign Up
                </button>
              </div>

              {/* رسائل الخطأ والنجاح */}
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
              )}
              
              {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {success}
                  <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    {/* الاسم الكامل */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* اسم المستخدم */}
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
                  </>
                )}

                {/* البريد الإلكتروني */}
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

                {/* كلمة المرور */}
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
                    {/* رقم الهاتف */}
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

                    {/* الدولة */}
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

                    {/* نوع الحساب */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">I want to join as:</label>
                      <div className="d-flex gap-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="user"
                            checked={formData.role === 'user'}
                            onChange={handleChange}
                            disabled={loading}
                          />
                          <label className="form-check-label">
                            <span className="fw-medium">Traveler</span>
                            <small className="d-block text-muted">Book tours and explore Egypt</small>
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="guide"
                            checked={formData.role === 'guide'}
                            onChange={handleChange}
                            disabled={loading}
                          />
                          <label className="form-check-label">
                            <span className="fw-medium">Tour Guide</span>
                            <small className="d-block text-muted">Offer tours and share expertise</small>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* شروط الاستخدام */}
                    <div className="mb-4 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="terms"
                        required
                        disabled={loading}
                      />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to the <a href="/terms" className="text-decoration-none">Terms of Service</a> and <a href="/privacy" className="text-decoration-none">Privacy Policy</a>
                      </label>
                    </div>
                  </>
                )}

                {/* زر الإرسال */}
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
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>

                {/* رابط التبديل */}
                <div className="text-center mt-4">
                  <p className="mb-0">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      type="button"
                      className="btn btn-link p-0 ms-2 text-decoration-none"
                      onClick={() => setIsLogin(!isLogin)}
                      disabled={loading}
                    >
                      <strong>{isLogin ? 'Sign Up' : 'Sign In'}</strong>
                    </button>
                  </p>
                </div>
              </form>

              {/* العودة للرئيسية */}
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