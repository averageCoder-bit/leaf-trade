import { NavLink } from "react-router-dom";
import { House, Package, CirclePlus, Store, UserRound } from "lucide-react";

const navigation = [
  { label: "Home", path: "/dashboard", icon: House },
  { label: "Products", path: "/products", icon: Package },
  { label: "Sell", path: "/products/new", icon: CirclePlus },
  { label: "Market", path: "/marketplace", icon: Store },
  { label: "Profile", path: "/profile", icon: UserRound },
];

const MobileBottomNav = () => {
  return (
    <nav
      aria-label="Mobile navigation"
      className="z-50 w-full shrink-0 border-t border-gray-200 bg-white md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="grid h-16 grid-cols-5 items-center">
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex h-full flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? "text-[#65b93e]"
                  : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            <Icon size={21} strokeWidth={1.8} />

            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
