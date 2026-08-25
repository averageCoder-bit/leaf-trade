import Login from "../auth/Login";
import Register from "../auth/Register";
import PublicLayout from "../layout/PublicLayout";
import LandingPage from "../public/LandingPage";
import Dashboard from "../pages/Dashboard";
import EmailVerification from "../auth/EmailVerification";
import SSOCallback from "./SSOCallback";

import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

import { Routes, Route } from "react-router-dom";
import DeviceVerification from "../auth/DeviceVerification";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import UserProfile from "../pages/Profile";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import HelpCenter from "../pages/HelpCenter";
import ProtectedLayout from "../layout/ProtectedLayout";
import ForgotPassword from "../auth/ForgotPassword";
import MarketPlace from "../pages/Marketplace";
import Messages from "../pages/Messages";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/verification" element={<EmailVerification />} />
      <Route path="/device-verification" element={<DeviceVerification />} />
      <Route path="password-reset" element={<ForgotPassword />} />
      <Route path="/sso-callback" element={<SSOCallback />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/orders-invoices" element={<Orders />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help-center" element={<HelpCenter />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
