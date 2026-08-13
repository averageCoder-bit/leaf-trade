import Logo from "../Logo";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const navItems = [
    { id: 1, name: "Register", path: "/register" },
    { id: 2, name: "Login", path: "/login" },
  ];

  return (
    <nav className="flex flex-row fixed w-full justify-between items-center p-4 shadow-xl bg-white z-50">
      <Logo />
      <div className="hidden md:flex md:flex-row gap-3">
        <button className="font-medium p-3 w-30 text-center hover:cursor-pointer hover:border-black hover:border hover:rounded-3xl">
          Home
        </button>
        <button className="font-medium p-3 w-30 text-center hover:cursor-pointer hover:border-black hover:border hover:rounded-3xl">
          Contact
        </button>
      </div>
      <FaBars
        size={25}
        className="md:hidden hover:cursor-pointer text-gray-500"
        onClick={() => {}}
      />
      <div className="hidden space-x-2 md:flex md:flex-row">
        {navItems.map((link) => (
          <Link
            key={link.id}
            to={link.path}
            className="inline-block w-30 h-12 p-3 bg-[#75cf4c] text-center text-white font-medium rounded-3xl 
            hover:bg-[#85d65c] active:bg-[#5fb33a] transition duration-300 ease-in-out cursor-pointer"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
