import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar";

const ProtectedOutlet = () => {
  const [isMenuToggle, setIsMenuToggle] = useState(false);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-gray-100">
      <DashboardNavbar setIsMenuToggle={setIsMenuToggle} />

      <div className="flex h-full pt-20">
        {isMenuToggle && (
          <div
            onClick={() => setIsMenuToggle(false)}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
          />
        )}
        <DashboardSidebar isMenuToggle={isMenuToggle} />

        <main className="flex-1 min-w-0 p-4 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedOutlet;
