import { Bell, Menu } from "lucide-react";

interface DashboardNavbarProps {
  setIsMenuToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardNavbar = ({ setIsMenuToggle }: DashboardNavbarProps) => {
  return (
    <nav className="flex flex-row fixed w-full justify-between items-center p-4 shadow-md bg-white z-50">
      <div className="flex flex-row items-center justify-center ml-2">
        <button
          title="Menu"
          onClick={() => setIsMenuToggle((prev) => !prev)}
          className="hover:cursor-pointer active:rotate-180 transition-transform duration-100 ease-in-out hover:bg-gray-200 rounded-2xl p-1 origin-center"
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
          title="Profile"
          className="flex flex-row items-center md:bg-gray-100 gap-2 p-2 rounded-3xl hover:cursor-pointer"
        >
          <img src="" className="rounded-full w-9 h-9 bg-red-500" />
          <p className="hidden lg:block text-sm">Username</p>
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
