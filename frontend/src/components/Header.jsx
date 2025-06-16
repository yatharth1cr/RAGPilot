// src/components/Header.jsx
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
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
    <header className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="h-8" />
        <span className="text-xl font-bold text-orange-400">RAGPilot</span>
      </Link>

      <nav className="flex items-center space-x-8">
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

        {/* Dropdown Button */}
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
    </header>
  );
}
