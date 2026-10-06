import Logo from "../Logo";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const PublicNavbar = () => {
  const authNavItems = [
    { id: 1, name: "Register", path: "/register" },
    { id: 2, name: "Login", path: "/login" },
  ];

  const publicNavItems = [
    { id: 1, name: "Home", path: "#hero-section" },
    { id: 2, name: "Contact", path: "#contact" },
    { id: 3, name: "About", path: "#about-us" },
    { id: 4, name: "Marketplace", path: "#marketplace-section" },
  ];

  const [isPublicSidebarToggle, setIsPublicSidebarToggle] = useState(false);

  return (
    <>
      <nav className="fixed z-50 flex w-full flex-row items-center justify-between bg-white p-4 shadow-sm">
        <Logo />

        <div className="hidden w-xl items-center justify-evenly md:flex md:flex-row">
          {publicNavItems.map((link) => (
            <a
              href={link.path}
              key={link.id}
              className="text-center text-sm font-medium text-black/70 transition-colors hover:cursor-pointer hover:text-black"
            >
              {link.name}
            </a>
          ))}
        </div>

        <FaBars
          size={25}
          className="text-gray-500 hover:cursor-pointer md:hidden"
          onClick={() => setIsPublicSidebarToggle((prev) => !prev)}
        />

        <div className="hidden space-x-2 md:flex md:flex-row">
          {authNavItems.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className="inline-block w-30 rounded-3xl bg-[#75cf4c] p-3 text-center text-sm font-medium text-white
              transition duration-300 ease-in-out hover:cursor-pointer hover:bg-[#85d65c] active:bg-[#5fb33a]"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
      <>
        <div
          className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 ${
            isPublicSidebarToggle
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsPublicSidebarToggle(false)}
        />

        <div
          className={`fixed right-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-1/2
      flex-col items-end gap-4 bg-white pt-7 pr-7
      transition-transform duration-300 ease-in-out
      ${isPublicSidebarToggle ? "translate-x-0" : "translate-x-full"}`}
        >
          {authNavItems.map((link) => (
            <Link key={link.id} to={link.path}>
              {link.name}
            </Link>
          ))}
        </div>
      </>
    </>
  );
};

export default PublicNavbar;
