import React from "react";
import ResumeLogo from "../../assets/ResumeLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-10 py-2 backdrop-blur-md bg-white/70 top-0 z-50 shadow-sm">
      <Link to="/">
      <img
        className="h-12 cursor-pointer hover:scale-105 transition"
        src={ResumeLogo}
        alt="logo"
      />
      </Link>

      <button className="px-6 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 shadow-sm hover:shadow-md">
        Sign In
      </button>
    </div>
  );
};

export default Header;
