import { useState } from "react";
import { Outlet } from "react-router-dom";

import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar";
import MobileBottomNav from "../components/MobileBottomNav";

const ProtectedOutlet = () => {
  const [isMenuToggle, setIsMenuToggle] = useState(false);

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-white md:bg-gray-100">
      {/* Desktop navbar */}
      <div className="hidden md:block">
        <DashboardNavbar setIsMenuToggle={setIsMenuToggle} />
      </div>

      {/* Sidebar and main content */}
      <div className="flex min-h-0 flex-1 md:pt-20">
        {/* Sidebar overlay on mobile */}
        {isMenuToggle && (
          <div
            onClick={() => setIsMenuToggle(false)}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
          />
        )}

        <DashboardSidebar isMenuToggle={isMenuToggle} />

        {/* Main content */}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-white md:bg-gray-100 md:p-4">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default ProtectedOutlet;
