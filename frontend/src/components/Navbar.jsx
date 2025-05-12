import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/auth";

function Navbar() {
  const [auth, setAuth] = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu Links */}
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-start md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-slate-700 md:bg-transparent px-4 md:px-0 space-y-2 md:space-y-0 md:space-x-6`}
        >
          <li><Link to="/" className="hover:text-yellow-400 py-2">HOME</Link></li>

          {/* Dropdown - About */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-yellow-400 py-2">ABOUT US</span>
            <ul className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-black rounded shadow-md w-48 z-10">
              <Link to="/about_us" className="px-4 py-2 hover:bg-gray-200">About Institute</Link>
            </ul>
          </li>

          {/* Dropdown - Departments */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-yellow-400 py-2">DEPARTMENTS</span>
            <ul className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-black rounded shadow-md w-48 z-10">
              <Link to="/deprtment" className="px-4 py-2 hover:bg-gray-200">Departments</Link>
            </ul>
          </li>

          {/* Dropdown - Academic */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-yellow-400 py-2">ACADEMIC</span>
            <ul className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-black rounded shadow-md w-48 z-10">
              <Link to="/departments/cse" className="px-4 py-2 hover:bg-gray-200">Teacher's Info</Link>
              <Link to="/departments/eee" className="px-4 py-2 hover:bg-gray-200">Student's Info</Link>
            </ul>
          </li>

          <li><Link to="/notice" className="hover:text-yellow-400 py-2">NOTICES</Link></li>
          <li><span className="cursor-pointer hover:text-yellow-400 py-2">PAYMENT</span></li>
          <li><Link to="/results" className="hover:text-yellow-400 py-2">RESULTS</Link></li>

          {/* Mobile Auth Buttons */}
          {isMenuOpen && (
            <div className="md:hidden flex flex-col gap-2 mt-2 w-full">
              {!auth.user ? (
                <>
                  <Link to="/register" className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-black text-center">
                    Register
                  </Link>
                  <Link to="/login" className="bg-white hover:bg-gray-100 px-4 py-2 rounded text-black text-center">
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <span className="bg-yellow-500 px-4 py-2 rounded text-black text-center">
                    {auth?.user?.name}
                  </span>
                  <Link
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="bg-gray-200 px-4 py-2 rounded text-center"
                  >
                    Dashboard
                  </Link>
                  <span
                    onClick={handleLogout}
                    className="bg-red-100 hover:bg-red-200 px-4 py-2 rounded text-center cursor-pointer"
                  >
                    Logout
                  </span>
                </>
              )}
            </div>
          )}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className=" gap-3">
          {!auth.user ? (
            <>
              <Link to="/register" className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded text-black font-medium">Register</Link>
              <Link to="/login" className="bg-white hover:bg-gray-100 px-2 py-1 rounded text-black font-medium">Login</Link>
            </>
          ) : (
            <div className="relative group">
              <span className="cursor-pointer bg-yellow-500 px-4 py-1 rounded text-black font-medium">
                {auth?.user?.name}
              </span>
              <ul className="absolute right-0 mt-2 hidden group-hover:flex flex-col bg-white text-black rounded shadow-md w-48 z-10">
                <Link
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="px-4 py-2 hover:bg-gray-200"
                >
                  Dashboard
                </Link>
                <span
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-red-100 cursor-pointer"
                >
                  Logout
                </span>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
