
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import Components
import Navbar from './Components/Navbar.jsx';
import Home from './page/Home';
import Destinations from './page/Destinations';
import TourDetails from './Components/TourDetails.jsx';
import MyBookingsPage from './page/UserDashboard';
import GuideDashboard from './page/GuideDashboard';
import AdminDashboard from './Components/AdminDashboard.jsx';
import AboutPage from './Components/AboutPage.jsx';
import ContactPage from './Components/ContactPage.jsx';
import LoginSignup from './Components/LoginSignup.jsx';
import GuideProfile from './Components/GuideProfile.jsx';
import BookGuide from './Components/BookGuide.jsx';

// مكون لحماية المسارات
const ProtectedRoute = ({ children, requireGuide = false, requireAdmin = false }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-center py-5" style={{ marginTop: '100px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requireGuide && user?.role !== 'guide') {
    return <Navigate to="/user" replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

// المكون الرئيسي للتطبيق
function AppContent() {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        <Routes>
          {/* مسارات عامة - لا تحتاج مصادقة */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<LoginSignup />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/tour/:id" element={<TourDetails />} />
          <Route path="/guide/:id" element={<GuideProfile />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* مسارات محمية للمستخدمين العاديين */}
          <Route path="/user" element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          } />
          
          {/* مسار حجز مرشد - يحتاج مصادقة */}
          <Route path="/book-guide/:id" element={
            <ProtectedRoute>
              <BookGuide />
            </ProtectedRoute>
          } />
          
          {/* مسارات محمية للمرشدين */}
          <Route path="/guide-dashboard" element={
            <ProtectedRoute requireGuide={true}>
              <GuideDashboard />
            </ProtectedRoute>
          } />
          
          {/* مسارات محمية للمشرفين */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* إعادة توجيه لجميع المسارات الأخرى */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

// المكون الجذر للتطبيق
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;