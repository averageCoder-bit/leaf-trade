import Logo from "../Logo";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

const PublicNavbar = () => {
  const [isPublicSidebarToggle, setIsPublicSidebarToggle] = useState(false);

  const authNavItems = [
    { id: 1, name: "Register", path: "/register" },
    { id: 2, name: "Login", path: "/login" },
  ];

  const publicNavItems = [
    { id: 1, name: "Home", path: "#hero-section" },
    { id: 2, name: "Contact", path: "#contact" },
    { id: 3, name: "About", path: "#about-us" },
    {
      id: 4,
      name: "Marketplace",
      path: "#marketplace-section",
    },
  ];

  const closeSidebar = () => setIsPublicSidebarToggle(false);

  useEffect(() => {
    if (!isPublicSidebarToggle) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSidebar();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isPublicSidebarToggle]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm md:h-20">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20">
          <Logo />

          {/* Desktop navigation */}
          <div className="hidden w-xl items-center justify-evenly md:flex">
            {publicNavItems.map((link) => (
              <a
                href={link.path}
                key={link.id}
                className="text-center text-sm font-medium text-black/70 transition-colors hover:text-black"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden space-x-2 md:flex">
            {authNavItems.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className="inline-block w-30 rounded-3xl bg-[#75cf4c] p-3 text-center text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-[#85d65c] active:bg-[#5fb33a]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={isPublicSidebarToggle ? "Close menu" : "Open menu"}
            aria-expanded={isPublicSidebarToggle}
            aria-controls="public-mobile-menu"
            onClick={() => setIsPublicSidebarToggle((prev) => !prev)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center text-gray-600 md:hidden"
          >
            {isPublicSidebarToggle ? (
              <FaTimes size={23} />
            ) : (
              <FaBars size={23} />
            )}
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeSidebar}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 md:hidden ${
          isPublicSidebarToggle
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile sidebar */}
      <aside
        id="public-mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!isPublicSidebarToggle}
        className={`fixed right-0 top-16 z-40 flex h-[calc(100dvh-4rem)] w-[70%] max-w-sm flex-col overflow-y-auto bg-white px-6 py-8 shadow-xl transition-all duration-300 ease-in-out md:hidden ${
          isPublicSidebarToggle
            ? "visible translate-x-0"
            : "invisible translate-x-full"
        }`}
      >
        {/* Navigation links */}
        <div className="flex flex-col gap-2">
          <span className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Navigation
          </span>

          {publicNavItems.map((link) => (
            <a
              key={link.id}
              href={link.path}
              onClick={closeSidebar}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-[#75cf4c]/10 hover:text-[#4b922e]"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="my-7 border-t border-gray-200" />

        {/* Authentication links */}
        <div className="flex flex-col gap-3">
          <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Account
          </span>

          {authNavItems.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              onClick={closeSidebar}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-[#75cf4c]/10 hover:text-[#4b922e]"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};

export default PublicNavbar;
