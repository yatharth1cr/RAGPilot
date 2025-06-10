// src/components/Header.jsx
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      {/* <div "> */}
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="h-8" />
        <span className="text-xl font-bold text-orange-400">RAGPilot</span>
      </Link>
      {/* </div> */}
      <nav className="flex items-center space-x-8">
        <Link
          to="/"
          className="text-lg font-semibold text-orange-400 hover:text-yellow-600 transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/chat"
          className="text-lg font-semibold text-orange-400 hover:text-yellow-600 transition duration-200"
        >
          Chat
        </Link>
        <Link
          to="/admin"
          className="text-lg font-semibold text-orange-400 hover:text-yellow-600 transition duration-200"
        >
          Admin
        </Link>
      </nav>
    </header>
  );
}
