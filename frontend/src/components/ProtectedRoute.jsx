import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import useAuthStore from "../store/useAuthStore";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
