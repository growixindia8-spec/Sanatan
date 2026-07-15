import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { usePortalAuth } from '../../context/PortalAuthContext';

export default function PortalProtectedRoute() {
  const { isAuthenticated, loading } = usePortalAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-[#FF6A00] rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium tracking-wide">Loading portal...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, Portal.jsx natively shows the login form
  // However, we still use this route to wrap portal routes logically if needed,
  // or redirect them explicitly to /portal
  if (!isAuthenticated && location.pathname !== '/portal' && location.pathname !== '/portal/login') {
    return <Navigate to="/portal" replace />;
  }

  return <Outlet />;
}
