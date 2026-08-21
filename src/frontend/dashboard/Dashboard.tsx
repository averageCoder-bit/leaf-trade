import { useClerk } from "@clerk/react";
import DashboardNavbar from "../components/DashboardNavbar";
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

const Dashboard = () => {
  const { signOut } = useClerk();
  const handleLogout = async () => {
    await signOut({ redirectUrl: "/login" });
  };

  const navItems1 = [
    { id: 1, name: "Dashboard", icon: Home },
    { id: 2, name: "Products", icon: Package },
    { id: 3, name: "Orders & Invoices", icon: ClipboardClock },
  ];

  const navItems2 = [
    { id: 1, name: "Reports", icon: FileText },
    { id: 2, name: "Settings", icon: Settings },
    { id: 3, name: "Help Center", icon: BotMessageSquare },
  ];

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-gray-100">
      <DashboardNavbar />

      <div className="flex h-full pt-20">
        <aside className="bg-white justify-between w-70 shrink-0 h-full flex flex-col p-5 pt-7 border-r border-gray-200">
          <div className="flex flex-row border-b border-gray-300 pt-3 py-6">
            <h1 className="text-2xl tracking-wide">Welcome Back, User</h1>
          </div>
          <nav className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <button className="text-sm tracking-wide font-semibold">
                  MENU
                </button>
                <ChevronDown size={18} />
              </div>
              <div className="flex flex-col gap-2">
                {navItems1.map((key) => (
                  <button className="hover:cursor-pointer hover:bg-gray-100 rounded-4xl p-2 pl-4 flex flex-row justify-start items-center gap-3">
                    <key.icon size={18} />
                    {key.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <button className="text-sm tracking-wide font-semibold">
                  OTHERS
                </button>
                <ChevronDown size={18} />
              </div>
              <div className="flex flex-col gap-2">
                {navItems2.map((key) => (
                  <button className="hover:cursor-pointer hover:bg-gray-100 rounded-4xl p-2 pl-4 flex flex-row justify-start items-center gap-3">
                    <key.icon size={18} />
                    {key.name}
                  </button>
                ))}
              </div>
            </div>
          </nav>
          <div className="flex flex-col">
            <button
              onClick={handleLogout}
              className="hover:cursor-pointer hover:bg-gray-100 rounded-4xl p-2 pl-4 flex flex-row justify-start items-center gap-3"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 overflow-y-auto h-full">
          <div className="flex justify-center items-center w-full h-full bg-white rounded-2xl shadow-sm p-4">
            <p>Empty dashboard</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
