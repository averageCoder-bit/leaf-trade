import { Search, Bell, Menu, Settings2 } from "lucide-react";

const DashboardNavbar = () => {
  return (
    <nav className="flex flex-row fixed w-full justify-between items-center p-4 shadow-md bg-white z-50">
      <div className="flex flex-row items-center justify-center ml-2">
        <button
          title="Menu"
          className="hover:cursor-pointer hover:bg-gray-200 rounded-2xl p-1"
        >
          <Menu />
        </button>
      </div>
      <div className="hidden md:flex md:flex-row gap-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2"
          />
          <input
            type="search"
            placeholder="Search products..."
            className="rounded-3xl bg-gray-100 p-3 pl-10 w-70 placeholder:text-sm placeholder:text-black focus:outline-1"
          />
        </div>

        <button
          title="Filter products"
          className="flex items-center justify-center hover:cursor-pointer bg-gray-100 w-12 h-12 rounded-full hover:bg-gray-200"
        >
          <Settings2 size={18} />
        </button>
      </div>
      <div className="hidden space-x-2 md:flex md:flex-row justify-center items-center">
        <button
          title="Notifications"
          className="flex items-center justify-center hover:cursor-pointer bg-gray-100 w-12 h-12 rounded-full hover:bg-gray-200"
        >
          <Bell size={18} />
        </button>
        <button
          title="Profile"
          className="flex flex-row items-center gap-2 bg-gray-100 p-2 rounded-3xl hover:cursor-pointer"
        >
          <img src="" className="rounded-full w-9 h-9 bg-red-500" />
          <p className="text-sm">Username</p>
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
