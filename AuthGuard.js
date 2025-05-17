import React from 'react';
import { useAuth } from '../lib/auth-context';

const AuthGuard = ({ children, fallback }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Using the primary blue for the spinner, consistent with the new theme */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If authenticated, render children
  if (isAuthenticated()) {
    return children;
  }

  // If not authenticated, render fallback or redirect
  // Updated to use yellow for the alert message as per user request
  return fallback || (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Access Denied!</strong>
      <span className="block sm:inline"> You must be logged in to view this page.</span>
    </div>
  );
};

export default AuthGuard;

