// src/protect/ProtectedRoute.js

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/Context/AuthContext'; // Adjust the path as necessary

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    // Preserve the location they were trying to go to
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Render the protected component for authenticated users
  return children;
};

export default ProtectedRoute;
