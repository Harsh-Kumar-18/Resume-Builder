import React from "react";
import { Github, Instagram, Linkedin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-900 text-gray-300 py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        <div className="flex gap-6">
          <a className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-pink-500 transition cursor-pointer"
            href="https://www.instagram.com/harsh.kumar.5?igsh=MWU1cDIzZDdlM3d4bQ=="
            target="_blank" rel="noopener noreferrer">
            <Instagram size={20} />
          </a>
          <a className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition cursor-pointer"
            href="https://www.linkedin.com/in/harsh-kumar-0a1036328"
            target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} />
          </a>
          <a className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-600 transition cursor-pointer"
            href="https://github.com/Harsh-Kumar-18"
            target="_blank" rel="noopener noreferrer">
            <Github size={20} />
          </a>
        </div>

        <div className="flex gap-8 font-medium">
          <span
            onClick={() => scrollToSection("about")}
            className="hover:text-white cursor-pointer transition"
          >
            About
          </span>
          <span
            onClick={() => scrollToSection("contact")}
            className="hover:text-white cursor-pointer transition"
          >
            Contact
          </span>
        </div>

        <div className="font-semibold text-sm tracking-wide bg-gradient-to-r from-orange-500 via-white to-green-600 bg-clip-text text-transparent">
          MADE WITH <span className="text-red-500">❤️</span> IN INDIA
        </div>
      </div>
    </div>
  );
};

export default Footer;
