// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// Dummy authentication function
// Replace this with your actual authentication logic or state
const isAuthenticated = () => {
  const authStatus = localStorage.getItem('isAuthenticated');
  console.log('Checking authentication:', authStatus === 'true'); // Debugging the authentication status
  return authStatus === 'true';
};

function ProtectedRoute({ children }) {
  // Debugging to see if the authentication check is working
  console.log('Is user authenticated? ', isAuthenticated());

  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render children components (protected route content)
  return children;
}

export default ProtectedRoute;
