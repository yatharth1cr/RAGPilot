import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-300 py-16 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Section - Heading and Description */}
        <div className="space-y-6 text-start">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-orange-700 leading-tight">
            Welcome to <br /> RAGPilot
          </h1>
          <p className="text-lg sm:text-xl text-gray-800 max-w-xl">
            RAGPilot is a smart, AI-powered Q&A assistant
            <br />
            that uses <strong>LangChain + Vector Databases</strong>
            <br />
            to answer questions from your <br />
            uploaded PDFs and web articles.
          </p>
        </div>

        {/* Right Section - Features and Actions */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">
              ✨ Features
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-base sm:text-lg">
              <li>Upload PDFs or provide URLs to ingest content</li>
              <li>
                Ask questions in a chat UI — powered by RAG (Retrieval Augmented
                Generation)
              </li>
              <li>Admin-only ingestion tools for safe content control</li>
              <li>Clean and responsive UI built with React + Tailwind</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/chat"
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition font-medium"
            >
              💬 Try Chat
            </Link>
            <Link
              to="/admin"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition font-medium"
            >
              ⚙️ Admin Panel
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-medium"
            >
              🔐 Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
