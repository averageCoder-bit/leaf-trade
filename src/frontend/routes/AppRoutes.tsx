import Login from "../auth/Login";
import Register from "../auth/Register";
import MainLayout from "../layout/Layout";
import LandingPage from "../public/LandingPage";

import { Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;
