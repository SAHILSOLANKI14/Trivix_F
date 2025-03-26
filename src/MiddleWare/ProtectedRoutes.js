import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, publicRoutes }) => {
  const location = useLocation();
  const isLoggedIn = Cookies.get("accessToken");

  if (isLoggedIn && publicRoutes.includes(location.pathname)) {
    return children;
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
