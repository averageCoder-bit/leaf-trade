import Login from "../auth/Login";
import Register from "../auth/Register";
import MainLayout from "../layout/Layout";
import LandingPage from "../public/LandingPage";
import Dashboard from "../dashboard/Dashboard";

import { Routes, Route } from "react-router-dom";
import EmailVerification from "../auth/Verification";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/verification" element={<EmailVerification />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;
