// src/components/Footer.jsx
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-orange-50 border-t border-orange-200 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src="/logo.svg" alt="RAGPilot Logo" className="h-8" />
            <span className="text-2xl font-bold text-orange-500">RAGPilot</span>
          </Link>
          <p className="text-sm text-gray-600">
            Your smart Retrieval-Augmented Generation assistant powered by
            LangChain, Express, and React.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-orange-600 font-semibold mb-2">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/chat" className="hover:text-orange-500">
                Chat
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-orange-500">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-orange-600 font-semibold mb-2">Contact</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <FaEnvelope /> support@ragpilot.ai
            </li>
            <li className="flex items-center gap-2">
              <FaGlobe /> www.ragpilot.ai
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-orange-600 font-semibold mb-2">
            Connect with us
          </h4>
          <div className="flex gap-4 text-orange-500 text-xl mt-2">
            <a
              href="https://github.com/yatharth1cr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/yatharthgiri108"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-orange-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RAGPilot. All rights reserved.
      </div>
    </footer>
  );
}
