import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Loader } from "lucide-react";

export default function AdminProtectedRoute() {
  const { isAdminAuthenticated, loading, adminUser } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader size={48} className="text-[#FF6600] animate-spin mb-4" />
        <p className="text-gray-500 font-medium text-sm">Verifying secure administrative session...</p>
      </div>
    );
  }

  // Confirm both token is present AND user role is an authorized administrator role
  const isAuthorized = isAdminAuthenticated && ['admin', 'superadmin', 'viewer'].includes(adminUser?.role);

  if (!isAuthorized) {
    // Redirect to login page and preserve requested path
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
