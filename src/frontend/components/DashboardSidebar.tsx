import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logout from "../auth/Logout";

import {
  Home,
  Package,
  LogOut,
  FileText,
  Settings,
  ClipboardClock,
  BotMessageSquare,
  Store,
} from "lucide-react";

interface DashboardSidebarProps {
  isMenuToggle: boolean;
}

const SideBar = ({ isMenuToggle }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems1 = [
    { id: 1, name: "Dashboard", link: "/dashboard", icon: Home },
    { id: 2, name: "Products", link: "/products", icon: Package },
    {
      id: 3,
      name: "Orders & Invoices",
      link: "/orders-invoices",
      icon: ClipboardClock,
    },
    { id: 4, name: "Marketplace", link: "/marketplace", icon: Store },
  ];

  const navItems2 = [
    { id: 1, name: "Reports", link: "/reports", icon: FileText },
    { id: 2, name: "Settings", link: "/settings", icon: Settings },
    {
      id: 3,
      name: "Help Center",
      link: "/help-center",
      icon: BotMessageSquare,
    },
  ];

  return (
    <>
      <aside
        className={`
      bg-white
      fixed md:relative
      top-16 md:top-0 left-0
      z-40
      h-[calc(100vh-4rem)] md:h-full
      shrink-0
      transition-all duration-300 ease-in-out
      text-sm md:text-base
      flex flex-col 
      border-r border-gray-200
      pt-10

      ${isMenuToggle ? "w-64 translate-x-0" : "w-64 -translate-x-full"}

      md:translate-x-0

      ${isMenuToggle ? "md:w-70" : "md:w-15"}
    `}
      >
        <div
          className={`flex-1 flex flex-col justify-start pt-7 transition-all duration-300 ${
            isMenuToggle ? "p-6" : "p-2.5"
          }`}
        >
          <nav className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {isMenuToggle ? (
                <span className="text-sm tracking-wide font-semibold block h-5">
                  MENU
                </span>
              ) : (
                <div className="h-5" />
              )}

              <div className="flex flex-col gap-2 overflow-hidden">
                {navItems1.map((item) => {
                  const isActive = location.pathname === item.link;

                  return (
                    <button
                      onClick={() => navigate(item.link)}
                      key={item.id}
                      title={item.name}
                      className={`hover:cursor-pointer rounded-4xl
                p-2 flex flex-row items-center
                transition-all duration-300
                ${isActive ? "bg-[#75cf4c] text-white" : "hover:bg-gray-100"}
                ${isMenuToggle ? "justify-start gap-3 pl-4" : "justify-center"}`}
                    >
                      <item.icon size={18} className="shrink-0" />

                      <span
                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                          isMenuToggle
                            ? "max-w-40 opacity-100"
                            : "max-w-0 opacity-0"
                        }`}
                      >
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {isMenuToggle ? (
                <span className="text-sm tracking-wide font-semibold block h-5">
                  OTHERS
                </span>
              ) : (
                <div className="h-5" />
              )}

              <div className="flex flex-col gap-2 overflow-hidden">
                {navItems2.map((item) => {
                  const isActive = location.pathname === item.link;

                  return (
                    <button
                      onClick={() => navigate(item.link)}
                      key={item.id}
                      title={item.name}
                      className={`hover:cursor-pointer rounded-4xl
                    p-2 flex flex-row items-center
                    transition-all duration-300
                    ${isActive ? "bg-[#75cf4c] text-white" : "hover:bg-gray-100"}
                    ${isMenuToggle ? "justify-start gap-3 pl-4" : "justify-center"}`}
                    >
                      <item.icon size={18} className="shrink-0" />

                      <span
                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                          isMenuToggle
                            ? "max-w-40 opacity-100"
                            : "max-w-0 opacity-0"
                        }`}
                      >
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        <div
          className={`flex flex-col mt-auto bg-white pb-6 border-t border-gray-100 transition-all duration-300 ${
            isMenuToggle ? "px-6 pt-4" : "px-2.5 pt-4"
          }`}
        >
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={`hover:cursor-pointer text-red-500 hover:bg-gray-100 rounded-4xl
              p-2 flex flex-row items-center
              transition-all duration-300
              ${isMenuToggle ? "justify-start gap-3 pl-4" : "justify-center"}`}
          >
            <LogOut size={18} className="shrink-0" />

            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                isMenuToggle ? "max-w-40 opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
      <Logout
        showLogoutConfirm={showLogoutConfirm}
        setShowLogoutConfirm={setShowLogoutConfirm}
      />
    </>
  );
};
export default SideBar;
