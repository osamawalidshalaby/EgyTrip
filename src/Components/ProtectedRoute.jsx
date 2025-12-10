import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireGuide = false }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requireGuide && user?.role !== 'guide') {
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default ProtectedRoute;