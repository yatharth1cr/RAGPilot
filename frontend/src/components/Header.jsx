import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { currentUser, logout } = useAuth();
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out!");
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-lg font-semibold transition ${
      isActive ? "text-yellow-600" : "text-orange-400 hover:text-yellow-600"
    }`;

  const AuthLinks = ({ onClick }) => (
    <>
      <div className="p-2 border-b">
        <span className="text-xs text-gray-500 px-2">Login</span>
        <Link
          to="/login/user"
          onClick={onClick}
          className="block px-4 py-2 hover:bg-orange-50 text-sm"
        >
          as User
        </Link>
        <Link
          to="/login/admin"
          onClick={onClick}
          className="block px-4 py-2 hover:bg-orange-50 text-sm"
        >
          as Admin
        </Link>
      </div>
      <div className="p-2">
        <span className="text-xs text-gray-500 px-2">Signup</span>
        <Link
          to="/signup/user"
          onClick={onClick}
          className="block px-4 py-2 hover:bg-orange-50 text-sm"
        >
          as User
        </Link>
        <Link
          to="/signup/admin"
          onClick={onClick}
          className="block px-4 py-2 hover:bg-orange-50 text-sm"
        >
          as Admin
        </Link>
      </div>
    </>
  );

  const UserDropdown = ({ isMobile = false }) => (
    <div
      className={`absolute right-0 mt-2 w-52 bg-white border rounded-md shadow-lg z-50 text-sm ${
        isMobile ? "top-full mt-2" : ""
      }`}
    >
      <div className="px-4 py-2 border-b">
        <div className="font-medium text-gray-700">{currentUser.email}</div>
        <div className="text-xs text-gray-500 capitalize">
          Role: {currentUser.role}
        </div>
      </div>
      <button
        onClick={() => {
          handleLogout();
          if (isMobile) setIsMobileNavOpen(false);
        }}
        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="h-8" />
          <span className="text-xl font-bold text-orange-400">RAGPilot</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/chat" className={navLinkClass}>
            Chat
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}

          <div className="relative" ref={dropdownRef}>
            {!currentUser ? (
              <>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
                >
                  Login / Signup
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                    <AuthLinks onClick={() => setIsMenuOpen(false)} />
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold hover:bg-orange-600"
                >
                  {currentUser.email.charAt(0).toUpperCase()}
                </button>
                {isMenuOpen && <UserDropdown />}
              </>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            aria-label="Toggle navigation"
          >
            {isMobileNavOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <NavLink
            to="/"
            onClick={() => setIsMobileNavOpen(false)}
            className="block px-4 py-2 text-orange-600 font-medium hover:bg-orange-100"
          >
            Home
          </NavLink>
          <NavLink
            to="/chat"
            onClick={() => setIsMobileNavOpen(false)}
            className="block px-4 py-2 text-orange-600 font-medium hover:bg-orange-100"
          >
            Chat
          </NavLink>
          {isAdmin && (
            <NavLink
              to="/admin"
              onClick={() => setIsMobileNavOpen(false)}
              className="block px-4 py-2 text-orange-600 font-medium hover:bg-orange-100"
            >
              Admin
            </NavLink>
          )}
          <div className="border-t pt-2 px-4 relative" ref={dropdownRef}>
            {!currentUser ? (
              <AuthLinks onClick={() => setIsMobileNavOpen(false)} />
            ) : (
              <>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold hover:bg-orange-600"
                >
                  {currentUser.email.charAt(0).toUpperCase()}
                </button>
                {isMenuOpen && <UserDropdown isMobile />}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
