import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/auth";

function Navbar() {
  const [auth, setAuth] = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    setDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-800 text-white shadow-md sticky top-0 z-50 text-sm sm:text-sm">
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
          <li>
            <Link to="/" className="hover:text-blue-400 hover:bg-white py-1 px-1">
              HOME
            </Link>
          </li>

          {/* Dropdown - About */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-blue-400 hover:bg-white py-1 px-1">
              ABOUT US
            </span>
            <ul className="absolute left-0 mt-2 hidden group-hover:inline-block bg-white text-blue-400 rounded shadow-md w-48 z-10">
              <li>
                <Link to="/about_us" className="px-4 py-2 block hover:bg-gray-200">
                  About Institute
                </Link>
              </li>
            </ul>
          </li>

          {/* Dropdown - Departments */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-blue-400 hover:bg-white py-1 px-1">
              DEPARTMENTS
            </span>
            <ul className="absolute left-0 mt-2 hidden group-hover:inline-block bg-white text-blue-400 rounded shadow-md w-48 z-10">
              <li>
                <Link to="/deprtment" className="px-4 py-2 block hover:bg-gray-200">
                  Departments
                </Link>
              </li>
            </ul>
          </li>

          {/* Dropdown - Academic */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-blue-400 hover:bg-white py-1 px-1">
              ACADEMIC
            </span>
            <ul className="absolute left-0 mt-2 hidden group-hover:inline-block bg-white text-blue-400 rounded shadow-md w-48 z-10">
              <li>
                <Link to="/departments/cse" className="px-4 py-2 block hover:bg-gray-200 border-b-2 border-black">
                  Teacher's Info
                </Link>
              </li>
              <li>
                <Link to="/departments/eee" className="px-4 py-2 block hover:bg-gray-200 border-b-2 border-black">
                  Student's Info
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/notice" className="hover:text-blue-400 hover:bg-white py-1 px-1">
              NOTICES
            </Link>
          </li>

          {/* Dropdown - Payment */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-blue-400 hover:bg-white py-1 px-1">
              PAYMENT
            </span>
            <ul className="absolute left-0 mt-2 hidden group-hover:inline-block bg-white text-blue-400 rounded shadow-md w-48 z-10">
              <li>
                <Link to="/admission" className="px-4 py-2 block hover:bg-gray-200 border-b-2 border-black">
                  Admission
                </Link>
              </li>
              <li>
                <Link to="/departments/eee" className="px-4 py-2 block hover:bg-gray-200 border-b-2 border-black">
                  Form fill-up
                </Link>
              </li>
              <li>
                <Link to="/departments/eee" className="px-4 py-2 block hover:bg-gray-200 border-b-2 border-black">
                  Admit Card Download
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/results" className="hover:text-blue-400 hover:bg-white py-1 px-1">
              RESULTS
            </Link>
          </li>
        </ul>

        {/* Auth Buttons (Visible on all screen sizes) */}
        <div className="relative flex items-center gap-3">
          {!auth.user ? (
            <>
              
              <Link
                to="/login"
                className="bg-white hover:bg-gray-100 px-2 py-1 rounded text-black font-medium"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative">
              <span
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer bg-yellow-500 px-4 py-1 rounded text-black font-medium"
              >
                {auth?.user?.name}
              </span>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 flex flex-col bg-white text-black rounded shadow-md w-48 z-50">
                  <li>
                    <Link
                      to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                      className="px-4 py-2 block hover:bg-gray-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <span
                      onClick={handleLogout}
                      className="px-4 py-2 block hover:bg-red-100 cursor-pointer"
                    >
                      Logout
                    </span>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
