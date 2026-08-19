import Login from "../auth/Login";
import Register from "../auth/Register";
import MainLayout from "../layout/Layout";
import LandingPage from "../public/LandingPage";
import Dashboard from "../dashboard/Dashboard";
import EmailVerification from "../auth/EmailVerification";
import SSOCallback from "./SSOCallback";

import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

import { Routes, Route } from "react-router-dom";
import DeviceVerification from "../auth/DeviceVerification";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/verification" element={<EmailVerification />} />
      <Route path="/device-verification" element={<DeviceVerification />} />
      <Route path="/sso-callback" element={<SSOCallback />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
