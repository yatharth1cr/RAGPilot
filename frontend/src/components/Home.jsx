import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-orange-100 to-orange-300 min-h-screen py-16 px-4 sm:px-6 lg:px-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-orange-700 leading-tight">
            Welcome to <br />
            <span className="text-orange-800">RAGPilot</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-800 max-w-2xl mx-auto lg:mx-0">
            RAGPilot is your smart assistant powered by{" "}
            <strong>LangChain + Vector Databases</strong> that allows you to
            interact with your documents and articles using natural language.
            Just upload PDFs or enter URLs, and start chatting with AI!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Link
              to="/chat"
              className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition font-semibold text-lg shadow-md"
            >
              💬 Try Chat
            </Link>
            <Link
              to="/admin"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition font-semibold text-lg shadow-md"
            >
              ⚙️ Admin Panel
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center">
          <img
            src="/logo.svg"
            alt="RAGPilot AI Logo"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm drop-shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto mt-24 px-2 sm:px-4 lg:px-0">
        <h2 className="text-3xl font-bold text-orange-700 text-center mb-12">
          ✨ Key Features of RAGPilot
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "📄",
              title: "Upload PDFs & URLs",
              desc: "Ingest structured or unstructured data by uploading files or providing links to web content.",
            },
            {
              icon: "💬",
              title: "Chat with Your Data",
              desc: "Interact with documents through a conversational AI that retrieves context-specific answers.",
            },
            {
              icon: "🔐",
              title: "Admin Panel",
              desc: "Access control and ingestion management for moderators and developers.",
            },
            {
              icon: "🧠",
              title: "LangChain + RAG",
              desc: "Empowered by cutting-edge Retrieval Augmented Generation and LangChain pipelines.",
            },
            {
              icon: "⚡",
              title: "Fast & Scalable",
              desc: "Works seamlessly for small documents to large knowledge bases using vector DBs.",
            },
            {
              icon: "🌐",
              title: "Web & Document Friendly",
              desc: "Supports HTML content and multi-page PDFs — making RAGPilot highly versatile.",
            },
          ].map(({ icon, title, desc }, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-lg font-semibold text-orange-700 mb-2">
                {title}
              </h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Case / About Section */}
      <section className="max-w-7xl mx-auto mt-24 px-2 sm:px-4 lg:px-0">
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 lg:p-12 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-800">
              Why RAGPilot?
            </h2>
            <p className="text-gray-700 text-base sm:text-lg">
              RAGPilot is built for{" "}
              <strong>researchers, developers, and teams</strong> who want to
              query documents, analyze articles, or automate knowledge
              retrieval. Whether you're building an internal tool or enhancing
              your product with document intelligence — RAGPilot is the ideal
              head-start.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 text-left">
              <li>No code ingestion</li>
              <li>Chat-based document understanding</li>
              <li>Ready-to-integrate backend logic</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src="/chat-preview.svg"
              alt="Chat preview"
              className="rounded-xl shadow-lg max-w-sm w-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
