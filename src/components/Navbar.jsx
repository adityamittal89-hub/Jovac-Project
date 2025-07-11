import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaExchangeAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <FaExchangeAlt className="text-indigo-500" />
          Bartrly
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hidden md:inline-block hover:text-indigo-600">
            Home
          </Link>
          <Link to="/contact" className="hidden md:inline-block hover:text-indigo-600">
            Contact
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-indigo-600">
                Dashboard
              </Link>
              <Link to="/my-listings" className="hover:text-indigo-600">
                My Listings
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-1 rounded bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;