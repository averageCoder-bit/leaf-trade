import Logo from "../Logo";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const PublicNavbar = () => {
  const authNavItems = [
    { id: 1, name: "Register", path: "/register" },
    { id: 2, name: "Login", path: "/login" },
  ];

  const publicNavItems = [
    { id: 1, name: "Home", path: "#hero-section" },
    { id: 2, name: "Contact", path: "#contact" },
    { id: 3, name: "About", path: "#about-us" },
    { id: 4, name: "Marketplace", path: "" },
  ];

  return (
    <nav className="flex flex-row fixed w-full justify-between items-center p-4 shadow-xl bg-white z-50">
      <Logo />
      <div className="hidden md:flex md:flex-row w-xl items-center justify-evenly">
        {publicNavItems.map((link) => (
          <a
            href={link.path}
            key={link.id}
            className="text-center text-sm font-medium text-black/70 hover:cursor-pointer hover:text-black transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
      <FaBars
        size={25}
        className="md:hidden hover:cursor-pointer text-gray-500"
        onClick={() => {}}
      />
      <div className="hidden space-x-2 md:flex md:flex-row">
        {authNavItems.map((link) => (
          <Link
            key={link.id}
            to={link.path}
            className="inline-block w-30 p-3 bg-[#75cf4c] text-center text-white text-sm font-medium rounded-3xl 
            hover:bg-[#85d65c] active:bg-[#5fb33a] transition duration-300 ease-in-out cursor-pointer"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default PublicNavbar;
