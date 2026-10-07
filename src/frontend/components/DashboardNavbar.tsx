import { Bell, Menu, User } from "lucide-react";
import { useCurrentUser } from "../services/userService";

interface DashboardNavbarProps {
  setIsMenuToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardNavbar = ({ setIsMenuToggle }: DashboardNavbarProps) => {
  const { data: currentUser } = useCurrentUser();
  return (
    <nav className="flex flex-row fixed w-full justify-between items-center p-4 shadow-md bg-white z-50">
      <div className="flex flex-row items-center justify-center ml-2">
        <button
          title="Menu"
          onClick={() => setIsMenuToggle((prev) => !prev)}
          className="hover:cursor-pointer hover:bg-gray-200 rounded-2xl p-1 origin-center"
        >
          <Menu />
        </button>
      </div>
      <div className="flex space-x-2 md:flex-row justify-center items-center">
        <button
          title="Notifications"
          className="flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 w-12 h-12 rounded-full active:bg-gray-200"
        >
          <Bell size={18} />
        </button>
        <button
          title={`Profile ${""}`}
          className="flex flex-row items-center md:outline outline-gray-300 gap-2 px-2 py-1.5 rounded-3xl hover:cursor-pointer hover:bg-gray-100"
        >
          <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gray-100">
            <User size={18} />
          </div>

          <p className="hidden lg:block text-sm">
            {currentUser?.username ?? "Username"}
          </p>
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
