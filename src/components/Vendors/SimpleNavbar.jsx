import React from "react";
import { useNavigate } from "react-router-dom";

const SimpleNavbar = ({ showLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any partner session here if needed
    navigate("/partner-login");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      {/* Logo on the left */}
      <a href="">
        <img className="h-9" src="/Evento_logo-horizontal.svg" alt="Evento Logo" />
      </a>
      {/* Logout button on the right */}
      {showLogout ? (
        <button
          onClick={handleLogout}
          className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
        >
          Logout
        </button>
      ) : (
        <div /> /* Empty div to keep spacing like original Navbar */
      )}
    </nav>
  );
};

export default SimpleNavbar;
