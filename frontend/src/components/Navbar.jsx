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
            <ul className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-blue-400 rounded shadow-md w-48 z-10">
              <Link to="/about_us" className="px-4 py-2 hover:bg-gray-200">
                About Institute
              </Link>
            </ul>
          </li>

          {/* Dropdown - Departments */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-blue-400 hover:bg-white py-1 px-1">
              DEPARTMENTS
            </span>
            <ul className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-blue-400 rounded shadow-md w-48 z-10">
              <Link to="/deprtment" className="px-4 py-2 hover:bg-gray-200">
                Departments
              </Link>
            </ul>
          </li>

          {/* Dropdown - Academic */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-blue-400 hover:bg-white py-1 px-1">
              ACADEMIC
            </span>
            <ul className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-blue-400 rounded shadow-md w-48 z-10">
              <Link to="/departments/cse" className="px-4 py-2 hover:bg-gray-200 border-b-2 border-black w-full">
                Teacher's Info
              </Link>
              <Link to="/departments/eee" className="px-4 py-2 hover:bg-gray-200 border-b-2 border-black w-full">
                Student's Info
              </Link>
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
            <ul className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-blue-400 rounded shadow-md w-48 z-10 ">
              <Link to="/departments/cse" className="px-4 py-2 hover:bg-gray-200 border-b-2 border-black w-full ">
                Admission 
              </Link>
              <Link to="/departments/eee" className="px-4 py-2 hover:bg-gray-200 border-b-2 border-black w-full">
                Form fill-up
              </Link>
              <Link to="/departments/eee" className="px-4 py-2 hover:bg-gray-200 border-b-2 border-black w-full">
                Admit Card Download
              </Link>
              
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
                to="/register"
                className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded text-black font-medium"
              >
                Register
              </Link>
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
                  <Link
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
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
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
