import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppLayouts from "./layouts/AppLayouts";
import AppRouter from "./Router";
import AuthLayout from "./layouts/Authlayout";
import ProtectedRoute from "./MiddleWare/ProtectedRoutes";
import { restoreSession } from "./modules/Auth/Actions/Actions";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
function LayoutWrapper() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthRoute = location.pathname.startsWith("/auth");
  const publicRoutes = ["/auth/login", "/auth/signup", "/forgot-pass"];
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);
  return isAuthRoute ? (
    <AuthLayout>
      <AppRouter />
    </AuthLayout>
  ) : (
    <ProtectedRoute publicRoutes={publicRoutes}>
      <AppLayouts>
        <AppRouter />
      </AppLayouts>
    </ProtectedRoute>
  );
}
function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}
export default App;
