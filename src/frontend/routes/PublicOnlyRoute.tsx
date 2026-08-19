import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/react";

const PublicOnlyRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
