import { useClerk } from "@clerk/react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  ChevronDown,
  Home,
  Package,
  LogOut,
  FileText,
  Settings,
  ClipboardClock,
  BotMessageSquare,
} from "lucide-react";

interface DashboardSidebarProps {
  isMenuToggle: boolean;
}

const SideBar = ({ isMenuToggle }: DashboardSidebarProps) => {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    await signOut({ redirectUrl: "/login" });
  };

  const navItems1 = [
    { id: 1, name: "Dashboard", link: "/dashboard", icon: Home },
    { id: 2, name: "Products", link: "/products", icon: Package },
    {
      id: 3,
      name: "Orders & Invoices",
      link: "/orders-invoices",
      icon: ClipboardClock,
    },
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

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isOthersOpen, setIsOthersOpen] = useState(true);
  return (
    <aside
      className={`bg-white ${
        isMenuToggle ? "w-70 p-6" : "w-15 p-2.5"
      } shrink-0 transition-[width] duration-300 ease-in-out h-full flex flex-col justify-between pt-7 border-r border-gray-200`}
    >
      <div className="flex flex-row border-b border-gray-300 pt-3 py-6 items-center overflow-hidden shrink-0">
        <h1
          className={`text-2xl tracking-wide font-semibold transition-all duration-300 ease-in-out ${
            isMenuToggle
              ? "opacity-100 max-w-50 max-h-20 translate-x-0"
              : "opacity-0 max-w-0 max-h-0 -translate-x-4 pointer-events-none"
          }`}
        >
          Welcome Back, User
        </h1>
      </div>

      <nav
        className={`flex flex-col transition-all duration-300 ${
          isMenuToggle ? "gap-10" : "gap-4"
        }`}
      >
        <div className="flex flex-col gap-4">
          {isMenuToggle ? (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-row justify-between items-center hover:cursor-pointer"
            >
              <span className="text-sm tracking-wide font-semibold">MENU</span>

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  isMenuOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          ) : null}

          <div
            className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ${
              !isMenuToggle || isMenuOpen
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
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
            <button
              onClick={() => setIsOthersOpen(!isOthersOpen)}
              className="flex flex-row justify-between items-center hover:cursor-pointer"
            >
              <span className="text-sm tracking-wide font-semibold">
                OTHERS
              </span>

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  isOthersOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          ) : null}

          <div
            className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ${
              isOthersOpen || !isMenuToggle
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
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
      <div className="flex flex-col">
        <button
          onClick={handleLogout}
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
  );
};
export default SideBar;
