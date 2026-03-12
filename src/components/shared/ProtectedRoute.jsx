import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Wraps protected routes.
 *  - Shows a loading spinner while auth state is resolving.
 *  - Redirects unauthenticated users to login.
 *  - Redirects users who don't have the required role.
 */
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && userData && !allowedRoles.includes(userData.role)) {
    // Redirect to their own dashboard
    const dest =
      userData.role === "admin"
        ? "/admin/dashboard"
        : userData.role === "trainer"
        ? "/trainer/dashboard"
        : "/member/dashboard";
    return <Navigate to={dest} replace />;
  }

  return children;
};

export default ProtectedRoute;
