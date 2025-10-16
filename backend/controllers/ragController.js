const { ingestPdf } = require("../rag/ingest");
const { queryWithRAG } = require("../rag/query");
const path = require("path");

// ------ Ingest PDF Handler Function ---
function ingestPdfHandler(req, res) {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const pdfPath = path.resolve("uploads", req.file.filename);
  ingestPdf(pdfPath)
    .then((result) => {
      res.json({ message: "PDF ingested successfully", ...result });
    })
    .catch((err) => {
      console.error("Ingest PDF error:", err);
      res.status(500).json({ error: err.message });
    });
}

// ------ Query Handler Function ---
function queryHandler(req, res) {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question is required" });

  queryWithRAG(question)
    .then(({ answer, sources }) => {
      res.json({
        answer,
        sources,
        suggestions: [
          "Can you summarize the document?",
          "What are the key points?",
          "Explain section 2 in simple terms",
          "What is the conclusion?",
        ],
      });
    })
    .catch((err) => {
      console.error("RAG query error:", err);
      res.status(500).json({ error: err.message });
    });
}

module.exports = { ingestPdfHandler, queryHandler };
