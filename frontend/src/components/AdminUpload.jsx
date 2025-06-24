import { useState } from "react";

export default function AdminUpload() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const uploadPDF = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file.");

    const formData = new FormData();
    formData.append("pdf", file);

    fetch("http://localhost:5000/ingest/pdf", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "PDF uploaded!");
      })
      .catch(() => {
        alert("Error uploading PDF.");
      });
  };

  const ingestURL = (e) => {
    e.preventDefault();
    if (!url) return alert("Please enter a valid URL.");

    fetch("url/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "URL ingested!");
      })
      .catch(() => {
        alert("Error ingesting URL.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-[#ff8904] flex flex-col md:flex-row items-center justify-center px-2 md:px-4 py-6">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Form Section */}
        <div className="flex-1 p-4 md:p-8 space-y-6 flex flex-col justify-center">
          <div className="space-y-2 text-sm">
            <p>
              Upload PDF or Ingest from URL
              <span className="text-orange-600 font-semibold">
                {" "}
                (Admin Only)
              </span>
            </p>
            <p className="text-red-500 font-semibold">
              Note: This feature is for admin use only.
            </p>
          </div>

          <form onSubmit={uploadPDF} className="space-y-4">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 border rounded-md cursor-pointer"
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition cursor-pointer"
            >
              Upload PDF
            </button>
          </form>

          <form onSubmit={ingestURL} className="space-y-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/article"
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition cursor-pointer"
            >
              Ingest URL
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center bg-orange-50">
          <img
            src="/logo.svg"
            alt="logo"
            className="w-48 h-48 md:w-72 md:h-72 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
