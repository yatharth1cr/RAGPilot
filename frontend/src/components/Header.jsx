import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="h-8" />
          <span className="text-xl font-bold text-orange-400">RAGPilot</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-lg font-semibold text-orange-400 hover:text-yellow-600 transition"
          >
            Home
          </Link>
          <Link
            to="/chat"
            className="text-lg font-semibold text-orange-400 hover:text-yellow-600 transition"
          >
            Chat
          </Link>
          <Link
            to="/admin"
            className="text-lg font-semibold text-orange-400 hover:text-yellow-600 transition"
          >
            Admin
          </Link>

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Login / Signup
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                <div className="p-2 border-b">
                  <span className="text-xs text-gray-500 px-2">Login</span>
                  <Link
                    to="/login/user"
                    className="block px-4 py-2 text-sm hover:bg-orange-50"
                  >
                    as User
                  </Link>
                  <Link
                    to="/login/admin"
                    className="block px-4 py-2 text-sm hover:bg-orange-50"
                  >
                    as Admin
                  </Link>
                </div>
                <div className="p-2">
                  <span className="text-xs text-gray-500 px-2">Signup</span>
                  <Link
                    to="/signup/user"
                    className="block px-4 py-2 text-sm hover:bg-orange-50"
                  >
                    as User
                  </Link>
                  <Link
                    to="/signup/admin"
                    className="block px-4 py-2 text-sm hover:bg-orange-50"
                  >
                    as Admin
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setShowMobileNav(!showMobileNav)}>
            {showMobileNav ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {showMobileNav && (
        <div className="md:hidden mt-4 space-y-2">
          <Link
            to="/"
            onClick={() => setShowMobileNav(false)}
            className="block px-4 py-2 text-orange-600 font-medium hover:bg-orange-100"
          >
            Home
          </Link>
          <Link
            to="/chat"
            onClick={() => setShowMobileNav(false)}
            className="block px-4 py-2 text-orange-600 font-medium hover:bg-orange-100"
          >
            Chat
          </Link>
          <Link
            to="/admin"
            onClick={() => setShowMobileNav(false)}
            className="block px-4 py-2 text-orange-600 font-medium hover:bg-orange-100"
          >
            Admin
          </Link>
          <div className="border-t pt-2 px-4">
            <p className="text-sm text-gray-500">Login</p>
            <Link
              to="/login/user"
              onClick={() => setShowMobileNav(false)}
              className="block py-1 text-sm hover:text-orange-700"
            >
              as User
            </Link>
            <Link
              to="/login/admin"
              onClick={() => setShowMobileNav(false)}
              className="block py-1 text-sm hover:text-orange-700"
            >
              as Admin
            </Link>

            <p className="text-sm text-gray-500 mt-2">Signup</p>
            <Link
              to="/signup/user"
              onClick={() => setShowMobileNav(false)}
              className="block py-1 text-sm hover:text-orange-700"
            >
              as User
            </Link>
            <Link
              to="/signup/admin"
              onClick={() => setShowMobileNav(false)}
              className="block py-1 text-sm hover:text-orange-700"
            >
              as Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
